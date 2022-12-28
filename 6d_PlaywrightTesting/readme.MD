# Automated Software Testing with Playwright:


## Section 1+2: Fundamentals:
- Go ahead and set up a nodeJS project to start.
- Playwright installation is **non-standard**:
   a) First install with *"npm i @playwright/test"*
   b) We need to run the playwright files with node to download browser extensions: *"npx playwright install"*
- Tests in playwright are written in TypeScript by default.
- Everything in Playwright is Asychronous - so we have to use async/await syntax. *Specifically, when we do function calls that manipulate our browser test models, each is async*

- Running a Basic Test:
 1) Create a Test folder, and a test file (see example).
 2) Run *"npx playwright test"* to run your battery of tests.

 - Definition:A headed test is one that is run in a browser instance, instead of behind-the scenes. use the *--headed* flag for npx playwright test above.

- Basic Options:
  1) --headed: launch a browser to perform tests.
  2) --browser=<firefox,chromium,...all>: Select one or more browsers to perform the test.
  3) Specific test files: *By default*, PW will run everything in the /test folder. You can specify a path to one file.

- Playwright uses awaits for a series of user events to occur, to test different conditions. For example, suppose we want to see a user fail to login, across two different pages. For a Test, we would write:

```
  test("Clicking on ELements @MyTag2", async ({ page }) => {
   await page.goto("http://zero.webapp.com")
   await page.click("#signin_button")
   await page.click("text=Sign In")
   const errorMessage = await page.locator(".alert-error");
   await expect(errorMessage).toContainText("Login ERROR")
  })
```

### Quick Review of CSS/JQuery Selectors:

Playwright can search a page's DOM tree for almost any property of any element. Some common selectors:

- By ID: "#myelement"
- by Class: ".myclass"
- By Tag: "button"
- Select Visible Elements: ".test-class:visible"
- Combinations: "#username .some-class"

- load a page: *page.goto()*

- perform a test, involving an element: *expect(elemRef).toTest()...*

- Performing inputs: 
  - use the *page.type()* or
  - *page.click()* functions.


- Testing Annotations: We can do modification to test blocks using Annotations
  - Skipping a test: *test.skip*(...)
  - Only run one test: *test.only*(...)
  - Making a suite of tests/grouping:

  ```
  test.describe("Descriptive Name", () => {
    test(...)
    test(...)
    test(...)
    })
  ```

The basic imperative pattern for a battery of tests, is to **wrap a series of tests in a test.describe() functional call.**

- **Test Tagging** is another way to select specific tests in a file.
The description string of the test() is given a special AT tag, which our cmd line runner will search for. 
- Example: *"test('My test @TestGroup1 @TestGroup2')"*. To run these tagged tests specifically: 

```
  npx playwright test --grep @TestGroupX
```
- You can also compliment the set of tagged tests by using the *--grep-invert* modified option!

### Playwright Configuration Files:

- For different browsers, and test environments, we use configuration files to avoid passing endless parameters. You can set global parameters, as well as browser specific parameters. See *playwright.config.ts* for details.

- To use configurations and projects: *"npx playwright test --config=<filepath> --project=<projectName>"*


- Reporters: Display the results of our tests. These can be verbose, visual or export to different files or screens.
    - Line/Dot: Simple coloured visuals indicating tests passed on Command Line.
    - List: List every test status on Command Line (defualt)
    - junit: use XML output.
    - html: write all data to an html file, writes to the /data folder.


- We can take Screenshots of our testing application, either the full page or individual elements.

-Hooks: Are used to add code before and after tests - and can help with setup/takedown, reducing code redundancy.
- Methods are:
  - beforeEach() 
  - beforeAll()
  - afterEach()
  - afterAll()

- Custom Functions: Simply put your own functions in a file with marked exports, and import with the ES Module system. 
- Remember to mark function calls with **"await" as everything is async**.

- Node Scripts: We don't want to type long command option strings into terminal, so setup package.json with the following:

```
"scripts": {
  "tests:chrome": "playwright test --config=playwright.config.ts --project=Chromium",
  "tests:firefox": "playwright test --config=playwright.config.ts --project=Firefox"
},
```

Scripts themselves are of course run with the npm command, such as:

```
npm run tests:chrome
```

This is the preferred way to run tests, instead of typing long strings with *npx playwright...*


-Playwright Inspector: Is similar to a FF/Chrome Debugger console. We can place breakpoints by using the *page.pause()* function. Note: This only works if the test is **--headed**


- Artifacts on Fail: We can produce videos and screenshots when one of our test cases fails. In the playwrite.config file, use the following option for the **use** subobject: *screenshot: "only-on-failure"*

- Running Tests in Parallel: Tests are run sequentially, unless we specify the .*parallel()* option. For a given test describe() block, we can modify it with *test.describe.parallel()...* To thread all of our subtests. If they are independent, this makes things faster.

## Section 3: End-To-End Test Project, using PW Fundamentals:

This was an example project, that implements the functionality mentioned above. See code base for details.

## Section 4: Page Objects Model:

The Page objects model is a Testing Design Pattern. Instead of having sprawling scripts of tests, grouped together with .describe() statements, we make Object classes *for each of the major application pages we wish to test*.

### Parts of a Playwright Project (by folders):

- /node_modules: where our playwright library files live.

- /package.json: Where we define our npm run X scripts, to run batteries of test.

- /e2e-config.ts: Our main playwright configuration file.

- /test/*: Where all of our test files live. This is where Playwright will look for tests first.


### Creating our Project Folder:

- When we specify Page Classes, each word is Capitalized by convention (ex :LoginPage.ts).
- Class Files are stored at the root level of the directory.
- Each Test Script imports a Class File, and in our describe() containers, we set local variables that hold an instance object of each class

```
import { ClassName } from "../ClassName"

test.describe...() {
  let className = ClassName

}

```

### Simple Example of Object Class and Test Container in Action:

Consider the HomePage Class:

```
import { Locator, Page } from '@playwright/test'
export class HomePage {
    readonly page: Page 
    readonly signInButton: Locator
    readonly searchBox: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchBox = page.locator("#searchTerm")
    }

    async visit() { ... }
    async clickOnFeedBackLink() { ... }
    async clickOnSignIn() { ... }

    async searchFor(phrase:string) {
        await this.searchBox.type(phrase)
        await this.page.keyboard.press("Enter")
    }
}

```

And how this is used in the *search.spec.ts* test bundle:

```
import { test, expect } from "@playwright/test"
import { HomePage } from "../HomePage"

test.describe("Search Results", () => {
    test("Should find test results", async ({page}) => {
       let homePage: HomePage = new HomePage(page)

        await homePage.visit()
        await homePage.searchFor("bank")

        const numOfLinks = await page.locator("li > a")
        await expect(numOfLinks).toHaveCount(2)
    })
})

```

The large, sprawling expanses of imperative code have been eliminated (as seen in E2E), because all this funcitonality is placed in the HomePage class! We have cleaner code.

### Abstract Classes:

We can model every page we visit with a Page Object Class. But for pages that have overlapping properties and methods, we can derive an Abstract Class to further reduce code-redundency.

Consider an AbstractPage that adds a wait() method to all pages that inherit it:

```
import { Page } from "@playwright/test"

export class AbstractPage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async wait(time) {
        await this.page.waitForTimeout(time)
    }
}

```

Inheritence in Type Script is done as follows:

```
export class LoginPage extends AbstractPage {
...
}

```

## Section 5: Advanced Visual Testing:

Sometimes, we want to take screenshots of our tests, and compare them against reference screenshots to see if anything on screen has changed (due to development mishaps for new code). 

Playwright can be configured to take screenshots of running page instances, during test interaction.

### Basic Setup:

In the config file, add the line: **"testDir: "./visual"**. To get a test to take a screenshot, use the **page.screenshot()** function.

Note: For the first test run, the screenshot will be generated and placed in your specified directory. This is your reference image.


### Update Screenshots:

Instead of deleting old ones, you can use the --update-snapshots flag to generate new ones:

```
playwright test --config=visual.config.ts --project=chromium --update-snapshots
```



## Section 6: Advanced: REST API Testing:

In this section, we set-up a Playwright project that queries online APIs. Frequently, applications will use APIs to fetch/post data from other web services - and testing these calls is a common development test-case.

For this project, we will use [reqres.in](https://reqres.in). Which is a free service that allows for API calls across HTTPS.



## Section 7: Advanced CI/CD Integration:


