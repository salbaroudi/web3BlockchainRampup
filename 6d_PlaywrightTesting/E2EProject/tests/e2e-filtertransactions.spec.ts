
import { test, expect } from "@playwright/test"

test.describe("Filter Transactions", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#signin_button")
        await page.type("#user_login", "username")
        await page.type("#user_password", "password")
        await page.click("text=Sign in")
        //Hack we dont auto redirect for Chrome+Linux
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html') 
    })

    test("Verify the results for each account", async ({ page }) => {
        await page.click("#account_activity_tab")
        //Select Option 2, it generates a table with 3 records, use various selectors to match tr's
        await page.selectOption("#aa_accountId","2")
        const checkAccount = await page.locator("#all_transactions_for_account tbody tr")
        await expect(checkAccount).toHaveCount(3)
        //Similar to above, just a different option 
        await page.selectOption("#aa_accountId", '4')
        const loanAccount = await page.locator("#all_transactions_for_account tbody tr")
        await expect(loanAccount).toHaveCount(2)
        //This option generates an empty table, so our selector is different.
        await page.selectOption("#aa_accountId", '6')
        const noResults = await page.locator(".well")
        await expect(noResults).toBeVisible()
    })

})
