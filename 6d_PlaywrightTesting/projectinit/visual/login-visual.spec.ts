import { test } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe("Login Page Visual Tests", () => {
    let homepage: HomePage
    let loginpage: LoginPage

    test.beforeEach(async ({ page }) => {
        homepage = new HomePage(page)
        loginpage = new LoginPage(page)
    })

    test("Login Form", async ({ page }) => {
        await loginpage.snapshotLoginForm()
    })

    test("Login Error Message", async ({ page }) => {
        await loginpage.login("Fail", "nopass")
        await loginpage.snapshotErrorMessage()
    })
})
