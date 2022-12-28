import { expect, Locator, Page } from '@playwright/test'
import { AbstractPage } from "./AbstractPage" 

export class LoginPage extends AbstractPage {
    // Define Selectors
    //readonly page: Page //From abstract page!
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage:Locator
    readonly loginForm: Locator
    //Init selectors using constructor
    constructor(page: Page) {
        super(page)
        this.usernameInput = page.locator("#user_login")
        this.passwordInput = page.locator("#user_password")
        this.submitButton = page.locator("text=Sign in")
        this.errorMessage = page.locator(".alert-error")
    }
    
    async login(username: string, password: string) {
        await this.usernameInput.type(username)
        await this.passwordInput.type(password)
        await this.submitButton.click()
    } 

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText('Login and/or password are wrong')
    }

    //Snapshot methods:
    async snapshotLoginForm() {
        await expect(this.loginForm.screenshot()).toMatchSnapshot("login-form.png")
    }

    async snapshotErrorMessage() {
        await expect(this.errorMessage.screenshot()).toMatchSnapshot("login-error.png")
    }
}

//How do we use LoginPage object?