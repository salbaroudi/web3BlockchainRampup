# Automated Software Testing with Playwright:


## Section 1+2: Fundamentals:
- Go ahead and set up a nodeJS project to start.
- Playwright installation is **non-standard**:
   a) First install with *"npm i @playwright/test"*
   b) We need to run the playwright files with node to download browser extensions: *"npx playwright install"*
- Tests in playwright are written in TypeScript by default.
- Everything in Playwright is Asychronous - so we have to use async/await syntax.

- Running a Basic Test:
 1) Create a Test folder, and a test file (see example).
 2) Run *"npx playwright test"* to run your battery of tests.

 - Definition: Headed: A headed test is one that is run in a browser instance, instead of behind-the scenes. use the *--headed* flag for npx playwright test above.

- Basic Options:
  1) --headed: launch a browser to perform tests.
  2) --browser=<firefox,chromium,...all>: Select one or more browsers to perform the test.
  3) Specific test files: By default, PW will run everything in the /test folder. You can specify a path to one file.

-Playwright uses awaits for a series of user events to occur,
to test different conditions. For example, suppose we want to see a user fail to login, across two different pages. See **example.spec.ts** file for details.

### Quick Review of CSS/JQuery Selectors:

Playwright can search a page's DOM tree for almost any property of any element. Some common selectors:

- By ID: "#myelement"
- by Class: ".myclass"
- By Tag: "button"
- Select Visible Elements: ".test-class:visible"
- Combinations: "#username .some-class"

- load a page: *page.goto()*

- perform a test, involving an element: *expect(elemRef).toTest()...*

- Performing inputs: use the *page.type()* or *page.click()* functions.


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
You wrap a series of tests in a test.describe functional call.

- Tagging is another way to select specific tests in a file.
The description string of the test() is given a special AT tag, which our cmd line runner will search for. Example: *"test('My test @TestGroup1 @TestGroup2')"*. To run these tagged tests specifically: *npx playwright test --grep @TestGroupX*
- You can also compliment the set of tests Tagged - by using the *--grep-invert* modified option!


### Playwright Configuration Files:

- For different browsers, and test environments, we use configuration files to avoid passing endless parameters. You can set global parameters, as well as browser specific parameters. See *playwright.config.ts* for details.
o
- To use configurations and projects: *"npx playwright test --config=<filepath> --project=<projectName>"*


- Reporters: Display the results of our tests. These can be verbose, visual or export to different files or screens.
    - Line/Dot: Simple coloured visuals indicating tests passed on Command Line.
    - List: List every test status on Command Line (defualt)
    - junit: use XML output.
    - html: write all data to an html file, writes to the /data folder.


- We can take Screenshots of our testing application, either the full page or individual elements.

-Hooks: Are used to add code before and after tests - and can help with setup/takedown, reducing code redundancy.
- Methods are *beforeEach beforeAll, afterEach afterAll*.

- Custom Functions: Simply put your own functions in a file with marked exports, and import with the ES Module system. Remember to mark function calls with "await" as everything is async.

- Node Scripts: We don't want to type long command option strings into terminal, so setup package.json with the following:

```
"scripts": {
  "tests:chrome": "playwright test --config=playwright.config.ts --project=Chromium",
  "tests:firefox": "playwright test --config=playwright.config.ts --project=Firefox"
},
```

-Playwright Inspector: Is similar to a FF/Chrome Debugger console. We can place breakpoints by using the *page.pause()* function. Note: This only works if the test is **--headed**


- Artifacts on Fail: We can produce videos and screenshots when one of our test cases fails. In the playwrite.config file, use the following option for the **use** subobject: *screenshot: "only-on-failure"*

- Running Tests in Parallel: Tests are run sequentially, unless we specify the .parallel() option. For a given test describe() block, we can modify it with *test.describe.parallel()...* To thread all of our subtests. If they are independent, this makes things faster.

## Section 3: End-To-End Test Project, using PW Fundamentals:
