import { test, expect } from '@playwright/test'
//WE import our LoginPage object.
import { LoginPage } from '../LoginPage'
import { HomePage } from '../HomePage' 

test.describe.parallel("Login / Logout flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage
    //before hook - load common website

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        //Now we have access to the setup fields in LoginPage, and
        //We avoid re-typing a lot of tedious details.
        homePage.visit()
    })

    //neg scenario
    test("Negative Scenario for login", async ({ page}) => {
        await homePage.clickOnSignIn()
        //await page.click("#signin_button")
        //await page.type("#user_login", "invalid username")
        //await page.type("#user_password", "invalid password")
        //await page.click("text=Sign in")
        
        await loginPage.login("invalid username,", "invalid password")
        await loginPage.assertErrorMessage()
        
        //const errorMessage = await page.locator(".alert-error")
        //await expect(errorMessage).toContainText("Login and/or password are wrong")
    })
    
    //pos scenario

    test("Positive Scenario for login", async ({ page}) => {
        //await page.click("#signin_button")
        await homePage.clickOnSignIn()
        //await page.click("#signin_button")
       // await page.type("#user_login", "username")
       // await page.type("#user_password", "password")
       // await page.click("text=Sign in")
        await loginPage.login("username", "password")

        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')
        const payBillsTab = await page.locator("#pay_bills_tab")
        await expect(payBillsTab).toBeVisible()

        //Let's logout!
        await page.goto("http://zero.webappsecurity.com/bank/logout.html")
        //Check to see that we are sent back to homepage
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")        
    })

})

