import {expect, Locator, Page } from '@playwright/test'

//We create a page for the main page Nav Bar (with tabs)

export class Navbar {
    readonly page: Page
    readonly accountSummary: Locator //each is a tab on the screen.
    readonly accountActivity: Locator
    readonly transferFunds: Locator
    readonly payBills: Locator
    readonly myMoneyApp: Locator
    readonly onlineStatements: Locator

    constructor(page: Page) {
        this.page = page
        this.accountSummary = page.locator("#account_summary_tab") //Anchors on page.
        this.accountActivity = page.locator("#account_activity_tab")
        this.transferFunds = page.locator("#transfer_funds_tab")
        this.payBills = page.locator("#pay_bills_tab")
        this.myMoneyApp = page.locator("#money_map_tab")
        this.onlineStatements = page.locator("#online_statements_tab")
    }

    async clickOnTab(tabName) { //object method. async as we need to wait for browser.
        switch(tabName) {
            case "Account Summary":
                await this.accountSummary.click()
                break
            case "Account Activity":
                await this.accountActivity.click()
                break
            case "Transfer Funds":
                await this.transferFunds.click()
                break
            case "Pay Bills":
                await this.payBills.click()
                break
            case "My Money App":
                await this.myMoneyApp.click()
                break
            case "Online Statements":
                await this.onlineStatements.click()
                break
            default:
                throw new Error("ERROR: Null or Non-Existant tab referenced.")
                
        }
    }




}