import { Locator, Page } from '@playwright/test'

export class HomePage {
    readonly page: Page 
    readonly signInButton: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
    }

    async visit() {
        await this.page.goto("http://zero.webappsecurity.com")
    }

    async clickOnSignIn() {
        await this.signInButton.click()
    }
}