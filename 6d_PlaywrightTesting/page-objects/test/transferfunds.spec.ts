import { test, expect } from "@playwright/test"
import { HomePage } from '../HomePage'
import { LoginPage } from '../LoginPage'


test.describe("Transfer Funds and Make Payments", () => {
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

    test("Transfer Funds", async ({ page }) => {
        await page.click("#transfer_funds_tab")
        await page.selectOption("#tf_fromAccountId", "2")
        await page.selectOption("#tf_toAccountId", "3")
        await page.type("#tf_amount", "500")
        await page.type("#tf_description", "just type anything")
        await page.click("#btn_submit")

        //Will lead us to a verify screen
        const boardHeader = await page.locator("h2.board-header")
        await expect(boardHeader).toContainText("Verify")
        //On the next page, there is another submit button with the same id
        await page.click("#btn_submit")

        //A greentext success message is generated, verify it.
        const message = await page.locator(".alert-success")
        await expect(message).toContainText("You successfully submitted your transaction")
    })
})
