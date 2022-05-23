"use strict";

//We use Star Wars API for this example.
//Lets fetch a person's data, and then spawn another fetch() request
//to get information on their homeworld!
const swapi = function(num) {
  let baseUrl = "https:/swapi.dev/api/people/";

  fetch(baseUrl + num + "/")
  .then(data => data.json()) //parse json
  .then(obj => {
    console.log(obj); //write the json rep.
    return fetch(obj.homeworld); //make another call.
  })
  .then(hwdata => hwdata.json()) //parse json again.
  .then(hwobj => console.log(hwobj)); //write json rep again.
};

console.log("Async Proof");
