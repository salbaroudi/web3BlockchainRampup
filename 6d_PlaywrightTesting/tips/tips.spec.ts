import { test, expect } from "@playwright/test"
import { getRandomNumber, getRandomString } from "../utils/data-helpers"


test.describe.only("Tips and Tricks Section", () => {
    //Each test function also exposes an optional test object.
    //This object proivdes the running state of Playwright - useful
    //for monitoring of tests (by automation software).
    test("TestInfo Object", async ({ page }, testInfo) => {
        await page.goto("https://www.example.com")
        console.log(testInfo)
    })

    //The Skip Browser Annotation - for when features are not implemented yet.
    //or for any other reason.
    test("Test Skip Browser", async ({ page, browserName }) => {
        test.skip(browserName === "chromium", "Feature not Implemented Yet!")
        await page.goto("https://www.example.com")
    })

    //The Fix-me Annotation. Does the same as skip(), but used for a different
    //catagory of problem: for code revision or for code stability.
    test("Test Fix-Me Annotation", async ({ page, browserName }) => {
        test.fixme(browserName === "chromium", "Test not stable, needs revision")
        await page.goto("https://www.example.com")
    })

    //Retries Feature
    //For flakey protocols, we need to sometimes retry tests.
    //This is specified at command line, with the --retries=X flag
    //Retries only works on tests that fail.


    //Parameterized Tests
    const people = ["Mike", "Judy", "Peter", "Chen", "Alice"]
    //The --headed option allows us to see the browser being puppeteered in real time!
    for(const name of people) {
        test(`Running test for ${name}`, async ({ page }) => {
            await page.goto("http://zero.webappsecurity.com/index.html")
            await page.type('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    //Simulating Mouse Movement!
    //Note: Doesn't control your personal mouse. Must be a DOM mouse pointer
    //that is manipulated.
    test("Simulate Mouse Movement", async ({ page }) => {
        await page.goto("https://www.example.com")
        await page.waitForTimeout(5000)
        await page.mouse.move(0,0)
        await page.waitForTimeout(500)
        await page.mouse.move(200,200)
        await page.waitForTimeout(500)
        await page.mouse.move(100,100)
    })

    //Multiple Browswer Tabs Example.
    test("Multiple Browser Tabs in One Browser", async ({ browser }) => {
        //Create new browser thread
        const context = await browser.newContext()
        //New Tabs
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto("https://www.example.com")
        await page2.goto("https://www.example.com")
        await page3.goto("https://www.example.com")
        await page1.waitForTimeout(5000)
    })

    //Device Emulation
    //Playwright can be run directly from command line, to simulate phone and 
    //browser screens. It emulates their screen settings and custom browser
    //limitations. For example, you can type:

    //npx playwright open --device="Nexus 4" wikipedia.org

    //To see what wikipedia looks like on an old Nexus 4 screen. Test will run
    //headed by default!

    //Generating PDF Files.
    //More commandline functionality. Self-Explanatory.
    //npx playwright pdf https://wikipedia.org afile.pdf

    //Generate Custom Screenshots:
    //We can add custom parameters to our screenshot command:
    //npx playwright screenshot --device="Nexus 4" --color-scheme=dark --wait-for-timeout=3000 wikipedia.org wiki.png

    //Configuring Timezones for browser simulation:
    //npx playwright open --timezone="Europe/Rome" --lang="it-IT" wikipedia.org
    //npx playwright open --geolocation="40.121,12.555" wikipedia.org

    test.only("Using Data Helpers", async ({ page }) => {
        console.log(await getRandomNumber())
        console.log(await getRandomString())
    })

})

