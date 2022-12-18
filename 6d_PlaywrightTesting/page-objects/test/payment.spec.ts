
import { test, expect } from "@playwright/test"

import { HomePage } from '../HomePage'
import { LoginPage } from '../LoginPage'


test.describe("Currency Purchase", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    
    test.beforeEach(async ({ page }) => {
        /*await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")
        //Hack we dont auto redirect for Chrome+Linux
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html') */

        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username","password")
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test("Should Purchase Currency", async ({ page }) => {
    await page.click("#pay_bills_tab")
    await page.type("#sp_payee", "apple")
    await page.click("#sp_get_payee_details")
    //Just checking to see if payee details load - system has registered payee correctly.
    await page.waitForSelector("#sp_payee_details")
    await page.selectOption("#sp_account", '6')
    await page.type("#sp_amount", "50")

    //This code is for a date picker, which is a complex HTML element.
    //All we need to do is type a properly formatted sate, and it will work.
    await page.type("#sp_date", "2021-11-09")
    await page.type("#sp_description", "We paid apple")

    //Now everything is set up, click the pay button
    await page.click("#pay_saved_payees")

    //Confirm green confirmation message
    // ">" means target a span right after we find the alert_content
    const message = await page.locator("#alert_content > span")
    await expect(message).toBeVisible()
    await expect(message).toContainText("The payment was successfully submitted")
    })
})