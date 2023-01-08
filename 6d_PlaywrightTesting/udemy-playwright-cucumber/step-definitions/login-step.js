//CommonJS imports, with destructuring.
const { Given, When, Then, defineStep } = require('@cucumber/cucumber')
const { LoginPage } = require('../page-objects/login-page')

const loginPage = new LoginPage()
//Under the Hood, Given, When Then are just syntactic sugar for defineStep.
//Our user wish really just acts as a functionName with no arguments.
defineStep('I visit a login page', async function () {
  await loginPage.navigateToLoginScreen()
})

defineStep('I fill the login form with valid credentials', async function () {
  await loginPage.submitLoginForm()
})

defineStep('I should see the home page', async function () {
  await loginPage.assertUserIsLoggedIn()
})

defineStep('I wait for 3 seconds', async function () {
  await loginPage.pause()
})
//We can of course parameterize our "user wishes". Ugly, but it works.
defineStep(
  /^I fill the login form with "([^"]*)" and "([^"]*)"$/,
  async function (username, password) {
    await loginPage.submitLoginWithParameters(username, password)
  }
)
