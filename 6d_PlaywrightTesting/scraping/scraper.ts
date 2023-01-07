const playwright = require("playwright");
const random_useragent = require("random-useragent");
const fs = require("fs");

const BASE_URL = "https://github.com/topics/playwright";

;(async () => {
    //npm install random-useragent
    const agent = random_useragent.getRandom();
    console.log(agent);

    const browser = await playwright.chromium.launch({headless: true });
    const context = await browser.newContext(({userAgent: agent}));
    //Bypass Content Security Policies
    const page = await context.newPage({bypassCSP: true });
    await page.setDefaultTimeout(30000);
    await page.setViewportSize({width: 800, height:600});
    await page.goto(BASE_URL);

    //Get the data
    //usage of eval ~_>
    //Give me all the repos that match the eval string
    const repositories = await page.$$eval("article.border", (repoCards) => {
        return repoCards.map((card) => {
            //Each card in our repositories hidden under the following selector
            const [user, repo] = card.querySelectorAll("h3 a")

            //1st class function
            const formatText = (element) => element && element.innerText.trim()
        
            return {
                user: formatText(user),
                repo: formatText(repo),
                url: repo.href,
            }
        })
    })

    console.log(repositories);

    //Finally, store data into files.
    const logger = fs.createWriteStream("./scraping/data.txt",{flag:"w"});
    logger.write(JSON.stringify(repositories, null, " "));

    //Need to manually close, or process will hang!!
    await browser.close()
})().catch(error => {
    console.log(error);
    process.exit(1);
})

//npm install random-useragent