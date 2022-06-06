const express = require("express");
const stories = require('./stories');
const request = require("request");
const path = require("path");

const app = express();

//Note the three arg header. We can choose to respond to client with res() immediately,
//or call Next() to go to another listener, if this listener is insufficient.
app.use((req,res,next) => {
  console.log("Request Details. Method:", req.method, "Original url:", req.originalUrl);
  next(); //move onto other listeners.
});

//When another app calls our API, this will pass the browser's preflight check.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
})

app.use(express.static(path.join(__dirname, "client/dist")));


// Note: '/ping' is a route string for express. if you put './ping' it will not work!
// Avoid linux habits.
app.get('/ping', (req,res) => {
  res.send('pong')
});

app.get("/stories", (req, res) => {
  res.json(stories);
});

//:title is a route parameter. We don't use the : in the url, this is an express path meta-character.
//By going to /stories/<word>, we can filter entries in our json that have <word> in the title.
app.get('/stories/:title', (req, res) => {
  const { title } = req.params;
  res.json(stories.filter(story => story.title.includes(title)));
});

//Req in Req in Req:
//Req1: we query with a GET in browser.
//Req2: fetch topSTories from HN
///Req3: take the top 10 stories, and get there data.

app.get("/topstories", (req,res,next) => {
  request(
    { url:"https://hacker-news.firebaseio.com/v0/topstories.json"},
    (error, response, body) => { //large callback function...
      if (error || response.statusCode != 200) {
        return next(new Error("Cant reach page!"));
        //next will just return and continue running - so we must put return keyword to stop continuation.
      }
      const topStories = JSON.parse(body);
      const limit = 10;

      //without promise, will return null as these are async calls. Wrap in promise to gain access.
      //idea: at time of access, we have not received repsonse => Thus just null.
      Promise.all( //static Method that processes a bunch of processes. Successful if all successful.
      topStories.slice(0,limit).map(story => {
        return new Promise((resolve, reject) => {
          request({
            url: `https://hacker-news.firebaseio.com/v0/item/${story}.json`
          }, (error, response, body) => {
            if (error || response.statusCode !== 200) {
              return reject(new Error("Error Requesting Story Item"));
            }

            resolve(JSON.parse(body)); //return our json to client.
          });
        })
      })
    ).then(fullTopStories => { //fullTS is our array of promise objects that have returned.
      res.json(fullTopStories);
    })
    .catch(error => next(error));
    }
  )
});

//Implicitly, if Express sees that we have 4 parameters, it knows the arrow function will handle errors.
//This will handle any error that comes from a request, throughout the code.
app.use((err, req, res, next) => {
  console.log("err", err);

  res.status(500).json({type: "error", message: err.message });
});


//For heroku
const PORT = 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
