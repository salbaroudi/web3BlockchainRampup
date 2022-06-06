## Steps for launching a Heroku App:

000) Sign up for Heroku, setup 2FA, install on your desktop.

00) Run *heroku login* on command line, and connect.

0) Make sure this project is uploaded to its own github repository before you start.

1) Now Adjustments to our App need to be done:

  a) Adjust the fetch() URL from *"localhost:3000"* to *`${document.location.origin}`*.

  b) Add an environment generated port number to index.js: with *const PORT = process.env.PORT || 3001;*


2) Once changes are complete, commit changes to github repository one more time.

3) Run *git push heroku main* to run the application in the cloud.

4) (Optional): See the Heroku setting panel to adjust port/url/mapping etc. Remember to update the
github repo link if you make this change with:  *git remote set-url <new heroku url>*
 
