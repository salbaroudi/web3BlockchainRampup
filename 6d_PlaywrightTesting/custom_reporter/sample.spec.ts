import { test, expect } from "@playwright/test";

//A basic example. Note that we don't need a description, a test
//Can just sit on its own!
test("A basic test", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const title = page.locator(".navbar__inner .navbar__title");
    await expect(title).toHaveText("Playwright")
})