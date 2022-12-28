import { test, expect, request } from "@playwright/test"

test.describe.parallel("API Testing", () => {
    const baseURL = "https://reqres.in/api"
    test.only("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        expect(response.status()).toBe(200)
        //We want to get the JSON Body from the response.
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
    })
    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/nonexistantpath`)
        expect(response.status()).toBe(404)
    })
})