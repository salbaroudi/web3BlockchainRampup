/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      url: 'http://localhost',
      show: false,
      browser: 'chromium'
    }
  },
  include: {
    "I": "./steps_file.js",
    "loginPagePage": "./pages/LoginPage.js"
  },
  name: 'bdd_codeceptjs'
}