import { test, expect } from "@playwright/test"
import { HomePage } from "../HomePage"

test.describe("Search Results", () => {
    test("Should find test results", async ({page}) => {
       let homePage: HomePage = new HomePage(page)
        //await page.goto("http://zero.webappsecurity.com/index.html")
        //await page.type("#searchTerm", "bank")
        //await page.keyboard.press("Enter")

        await homePage.visit()
        await homePage.searchFor("bank")
        //Verify that the search results contain two links:
        const numOfLinks = await page.locator("li > a")
        await expect(numOfLinks).toHaveCount(2)
    })
})