import { test, expect } from "@playwright/test"

test.describe("Search Results", () => {
    test("Should find test results", async ({page}) => {
        await page.goto("http://zero.webappsecurity.com/index.html")
        await page.type("#searchTerm", "bank")

        await page.keyboard.press("Enter")

        //Verify that the search results contain two links:
        const numOfLinks = await page.locator("li > a")
        await expect(numOfLinks).toHaveCount(2)
    })
})