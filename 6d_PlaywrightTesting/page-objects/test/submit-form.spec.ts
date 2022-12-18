import {test, expect} from "@playwright/test"
import { HomePage } from '../HomePage'
import { FeedBackPage } from '../FeedBackPage'

test.describe("Feedback Form", () => {
    //As we have more than one test, we need these outside of test scope.
    //(all can acccess these variables).
    let homePage: HomePage
    let feedbackPage: FeedBackPage

    test.beforeEach(async ({ page }) => {
        //await page.goto("http://zero.webappsecurity.com/index.html")
        //await page.click("#feedback")
        homePage = new HomePage(page)
        feedbackPage = new FeedBackPage(page)

        //Async as we are making internet requests!
        await homePage.visit()
        await homePage.clickOnFeedBackLink()
    })

    test("Reset Feedback Form", async ({ page }) => {
        /*await page.type("#name", "MyName")
        await page.type("#email", "Myemail@email.com")
        await page.type("#subject", "MyTitle")
        await page.type("#comment", "MyComment")
        await page.click("input[name='clear']")

        const nameInput = await page.locator("#name")
        const commentInput = await page.locator("#comment")
        await expect(nameInput).toBeEmpty()
        await expect(commentInput).toBeEmpty()*/
        await feedbackPage.fillForm("aname","anemail@gmail.com","asubject","amessage")
        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
    })


    test("Submit Feedback Form", async ({ page }) => {
        /*await page.type("#name", "MyName")
        await page.type("#email", "Myemail@email.com")
        await page.type("#subject", "MyTitle")
        await page.type("#comment", "MyComment")
        await page.click("input[type='submit']")
        //Fast way to assert that our feedback submission page has loaded.
        await page.waitForSelector("#feedback-title")*/
        await feedbackPage.fillForm("aname","anemail@gmail.com","asubject","amessage")
        await feedbackPage.submitForm()
        await feedbackPage.feedbackFormSent()

    })


})