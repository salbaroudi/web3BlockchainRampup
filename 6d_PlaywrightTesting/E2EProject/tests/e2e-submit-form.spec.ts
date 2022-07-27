import {test, expect} from "@playwright/test"


test.describe("Feedback Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.click("#feedback")
    })

    test("Reset Feedback Form", async ({ page }) => {
        await page.type("#name", "MyName")
        await page.type("#email", "Myemail@email.com")
        await page.type("#subject", "MyTitle")
        await page.type("#comment", "MyComment")
        await page.click("input[name='clear']")

        const nameInput = await page.locator("#name")
        const commentInput = await page.locator("#comment")
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()
    })


    test("Submit Feedback Form", async ({ page }) => {
        await page.type("#name", "MyName")
        await page.type("#email", "Myemail@email.com")
        await page.type("#subject", "MyTitle")
        await page.type("#comment", "MyComment")
        await page.click("input[type='submit']")
        //Fast way to assert that our feedback submission page has loaded.
        await page.waitForSelector("#feedback-title")

    })


})