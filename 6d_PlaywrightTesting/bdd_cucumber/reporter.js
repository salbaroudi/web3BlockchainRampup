const reporter = require('cucumber-html-reporter')

//Here we setup our JSON settings object, and then pass it into the
//reporter instance. Our tests results are formatted and then printed.
const options = {
  theme: 'bootstrap',
  jsonFile: 'cucumber_report.json',
  output: 'reports/cucumber_report.html',
  reportSuiteAsScenario: true,
  scenarioTimestamp: true,
  launchReport: false,
  metadata: {
    'App Version': '2.0.0',
    'Test Environment': 'STAGING',
    Browser: 'Chrome 54.0',
    Platform: 'Windows 10',
  },
}

reporter.generate(options)
