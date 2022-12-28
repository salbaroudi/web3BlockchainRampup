import { test, expect } from "@playwright/test"

//We compare against snap shots to visually catch changes to the page!
test.describe.only("Visual Regression Testing Example", () => {
    test("Full Page Snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })

    test("Single Element Snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        let pageElement = await page.$("h1")
        //Notice that we called screenshot() on an element - not just a Page method!
        //Add comment below to avoid null warnings *sigh...*
        //See: https://stackoverflow.com/questions/40349987/how-to-suppress-error-ts2533-object-is-possibly-null-or-undefined/58121244#58121244
        // @ts-ignore: Object is possibly 'null'.
        expect(await pageElement.screenshot()).toMatchSnapshot("page-title.png")
    })

})
