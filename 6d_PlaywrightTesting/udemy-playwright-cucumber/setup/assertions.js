//We need Chai for assertions.
//Raw Playwright (not @Playwright/test) and Cucumber does not come with 
//Assertions capability.
const chai = require('chai')

global.expect = chai.expect
global.assert = chai.assert
global.should = chai.should
