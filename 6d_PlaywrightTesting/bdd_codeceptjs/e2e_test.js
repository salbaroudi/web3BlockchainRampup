const LoginPage = require("./pages/LoginPage");

Feature("Zero Bank Application - E2E Tests")

Before( ({I}) => {
    console.log("BEFORE HOOK");
    I.amOnPage("http://zero.webappsecurity.com/index.html");
})

After(({I}) => {
    console.log("AFTER HOOK");
})

Scenario("Login Test - Negative", ({ I }) => {
    //I.amOnPage("http://zero.webappsecurity.com/index.html")
    I.click("#signin_button")
    I.seeElement("#login_form")
    /*I.fillField("#user_login", "bad username")
    I.fillField("#user_password", "bad password")
    I.click(".btn-primary")*/
    //Code Refactored into LoginPage Page Object.
    LoginPage.submitLogin("bad user", "bad pass");
    //LoginPage.assertLoginFormIsVisible();
})