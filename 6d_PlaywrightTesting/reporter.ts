import { Reporter } from "@playwright/test/reporter";
import * as fs from "fs";

//Note: Our NPM run command is just inside customreporter.config.ts
class MyReporter implements Reporter {
    //Before tests are run...
    onBegin(config, suite) {
        console.log(`Execution of ${suite.allTests().length} tests!`);
    }

    //After Tests are finished
    onEnd(result) {
        console.log(`Execution has finished with status of ${result.status}`)
    }

    //Always trigger before every test.
    onTestBegin(test) {
        console.log(`Execution of ${test.title} started.`)
    }

    //At end of every test...
    onTestEnd(test,result) {
        const execTime = result.duration;

        const data = {
            test: test.title,
            status: result.status,
            executionTime: execTime,
            errors: result.errors,
        };

        const dataToString = JSON.stringify(data,null,2);
        console.log(data);

        fs.writeFileSync("./custom_reporter/test_result.json", dataToString);
    }
}

export default MyReporter;