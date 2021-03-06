 import {test, expect} from "@playwright/test"
 import { loadHomepage, assertTitle } from "../helpers"


 test("Simple basic test", async ({ page }) => {
   //Open Browser, go ot this page/.
   await page.goto("https://www.example.com");
   //use a selector to access an element on page
   const pageTitle = await page.locator("h1")
   //Our Testing condition.
   await expect(pageTitle).toContainText("Example Domain")
 })

//A test to see a user login interaction.
 test("Clicking on ELements @MyTag2", async ({ page }) => {
   await page.goto("http://zero.webappsecurity.com/index.html")
   //We await the following chain of events:
   //1 - PW clicks the signin button on main page
   await page.click("#signin_button")
   //2 - PW clicks the Sign In button on login page
   await page.click("text=Sign In")
   //We locate our error message element, with class .alerterror
   const errorMessage = await page.locator(".alert-error");
   //we check to see the failed login message, and got the following error text
   await expect(errorMessage).toContainText("Login and/or password are wrong.")
 })

//Here, we perform textbox inputs and try to log into a page.
 test("Inputs Test @MyTag2", async ({ page }) => {
   await page.goto("http://zero.webappsecurity.com/index.html")
   //Goto signin page
   await page.click("#signin_button")
   //fill in username and password, click the button
   await page.type("#user_login", "Some username")
   await page.type("#user_password", "Some password")
   await page.click('text=Sign in')

   const errorMessage = await page.locator(".alert-error");
   await expect(errorMessage).toContainText("Login and/or password are wrong.")
 })

//Some examples of assertions we can make for a page
 test("Assertions @MyTag1", async ({ page }) => {
   await page.goto("https://www.example.com")
   await expect(page).toHaveURL("https://www.example.com")
   await expect(page).toHaveTitle("Example Domain")

   const element = await page.locator("h1")
   await expect(element).toBeVisible()
   await expect(element).toHaveText("Example Domain")
   await expect(element).toHaveCount(1)
   //Note the NOT operator usage below. It is done via OBJ notation.
   const nExistElement = await page.locator('h5')
   await expect(nExistElement).not.toBeVisible()
 })

//Skip test example.
 test.skip("Skip this test", ({page}) => {
   return
 })

/* Run only specified test, example.
 test.only("Only this test", ({page}) => {
   return
 })
*/

//Define a suite of tests, group them together
/*  test.describe("Descriptive Name", () => {
    test.("One", ({page}) => {...})
    test.("Two", ({page}) => {...})
})
*/

test.skip("Screenshots Full Page", async ({ page }) => {
  await page.goto("https://example.com")
  //Need JSON Object to customize options, instead of meandering fheader.
  await page.screenshot({path: "screenshot.png", fullPage: true})
})

test.skip("Screenshots Single Element", async ({ page }) => {
  await page.goto("https://example.com")
  //Notice we focus screenshot on the element now, not page.
  const element = await page.locator("h1")
  await element.screenshot({path: "single.png", fullPage: false})
})


test.describe.parallel.only("Hooks Example", () => {
  //We can reduce setup redundancies with the beforeEach hook.
  test.beforeEach(async ({ page }) => {
    await page.goto("https://example.com")
  })

  test("Screenshots Full Page", async ({ page }) => {
    //Need JSON Object to customize options, instead of meandering fheader.
    await page.screenshot({path: "screenshot.png", fullPage: true})
  })

  test("Screenshots Single Element", async ({ page }) => {
    //Notice we focus screenshot on the element now, not page.
    const element = await page.locator("h1")
    await element.screenshot({path: "single.png", fullPage: false})
  })
})

//We can just make our own functions in a .ts file, and import them (above)
test("Custom Function Example", async ({ page }) => {
  //Remember: our imported function is async, but we still need to mark
  //These behaviours with awaits
  //Closures must occur, as we don't return anything. and we have persistance
  //of loaded objects.
  await loadHomepage(page)
  await page.pause()
  await assertTitle(page)
})
