import { test, expect } from "@playwright/test"

import { HomePage } from '../HomePage'
import { LoginPage} from '../LoginPage'


test.describe("Buy Currency Challenge", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        /*await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")
        //Hack we dont auto redirect for Chrome+Linux */
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username","password")
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
    })

    test("Currency Purchase", async ({ page }) => {
        //First we click on the Pay Bills Tab
        await page.click("#pay_bills_tab")
        //Then we click on the Purchase Foreign currency Tab
        await page.click("text=Purchase Foreign Currency")
        //Let's verify that we made it to the right sub-tab
        //There cannot be a space between h2 and .board-header!
        const sellRateMessage = await page.locator('h2.board-header')
        await expect(sellRateMessage).toBeVisible()

        //Select a Currency Option
        await page.selectOption("#pc_currency", "GBP")

        //Check to see that help box came up.
        const helpbox = await page.locator("#sp_sell_rate")
        await expect(helpbox).toContainText("1 pound")

        //Now enter an amount, click USD, click Calculate
        await page.type("#pc_amount", "200")
        await page.click("#pc_inDollars_true")
        await page.click("#pc_calculate_costs")

        //Test that we got our spot price conversion amount.
        const convMessage = await page.locator("#pc_conversion_amount")
        await expect(convMessage).toContainText("(GBP)")

        //Commit to the Purchase, check we got confirmation.
        await page.click("#purchase_cash")
        const confirmMessage = await page.locator("#alert_content")
        //Extra step useful, as it needs to load first. Could be server lag for complex operation (purchase)
        await expect(confirmMessage).toBeVisible()
        await expect(confirmMessage).toContainText("Foreign currency cash was successfully purchased.")
    })
})