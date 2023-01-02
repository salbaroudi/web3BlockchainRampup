import { test, expect, request } from "@playwright/test"

test.describe.parallel("API Testing", () => {
    const baseURL = "https://reqres.in/api"
    test("Simple API Test - Assert Response Status", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        expect(response.status()).toBe(200)
        //We want to get the JSON Body from the response.
        const responseBody = JSON.parse(await response.text())

    })
    test("Simple API Test - Assert Invalid Endpoint", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/nonexistantpath`)
        expect(response.status()).toBe(404)
    })

    test("GET request - Get user data", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/1`)
        const responseBody = JSON.parse(await response.text())
        console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        //Just needs to not be null or empty!
        expect(responseBody.data.email).toBeTruthy()
        expect(responseBody.data.last_name).toBe("Bluth")
        

    })

    test("POST - Create New User", async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                id:1000,
            }})
        const responseBody = JSON.parse(await response.text())
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("POST - Login PASS", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email:"eve.holt@reqres.in",
                password: "cityslicka",
            }})
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })

    test("POST - Login FAIL", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                email:"eve.holt@reqres.in",
            }})
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe("Missing password")
    })

    test("PUT Request - update user", async ({ request }) => {
        const response = await request.put(`${baseURL}/users/2`, {
            data: {
                name:"new name",
                job: "new job",
            }})
        const responseBody = JSON.parse(await response.text())
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe("new name")
        expect(responseBody.job).toBe("new job")
        expect(responseBody.updatedAt).toBeTruthy()
    })

    test("DELETE Request - delete a user", async ({ request }) => {
        const response = await request.delete(`${baseURL}/users/2`)
        expect(response.status()).toBe(204)
    })

})