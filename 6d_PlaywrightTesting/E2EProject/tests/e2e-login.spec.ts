import { test, expect } from '@playwright/test'

test.describe.parallel("Login / Logout flow", () => {
    //before hook - load common website

    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com")
    })
    //neg scenario
    test("Negative Scenario for login", async ({ page}) => {
        await page.click("#signin_button")
        await page.type("#user_login", "invalid username")
        await page.type("#user_password", "invalid password")
        await page.click("text=Sign in")
        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong")

    })
    //pos scenario

    test("Positive Scenario for login", async ({ page}) => {
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
        const payBillsTab = await page.locator("#pay_bills_tab")
        await expect(payBillsTab).toBeVisible()

        //Let's logout!
        await page.goto("http://zero.webappsecurity.com/bank/logout.html")
        //Check to see that we are sent back to homepage
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")        
    })

})

