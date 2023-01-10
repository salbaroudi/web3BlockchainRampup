Feature('example');

//Each test in a suite is called a scenario
//I stands for the user!
Scenario('test something',  ({ I }) => {
    I.amOnPage("https://www.example.com");
    //This must search the entire DOM tree
    I.see("Example");
    I.dontSee("Google");
    I.seeElement("h1")
    I.dontSeeElement("#nonexistant")
});

Scenario('2nd test',  ({ I }) => {
    I.amOnPage("https://www.example.com");
    //This must search the entire DOM tree
    I.see("Example");
    I.dontSee("Google");
    I.seeElement("h1")
    I.dontSeeElement("#nonexistant")
});
