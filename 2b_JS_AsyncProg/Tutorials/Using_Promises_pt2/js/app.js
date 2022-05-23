"use strict";

let wordnikWords = "http://api.wordnik.com/v4/words.json/",
    wordnikWord = "http://api.wordnik.com/v4/word.json/",
    apiKey = "?api_key=XXX",
    wordObj;

//We will use fetch() to get data from a website (Worknik)
//Lets set up a promise chain to illustrate what Wordnik can do!
fetch(wordnikWords + "randomWord" + apiKey)
.then(function(response) {
  wordObj = response;
  //console.log(wordObj);
  return response.json(); //JSON object is wrapped in a promise.
})
.then(function(data) {
  console.log(data.word);
  return fetch(wordnikWord + data.word + "/definitions" + apiKey);
})
.then(function(response) {
  return response.json();
})
.then(function(def) {
  console.log(def[1].text)
})
.catch(function(err) {
  console.log(err);
});
