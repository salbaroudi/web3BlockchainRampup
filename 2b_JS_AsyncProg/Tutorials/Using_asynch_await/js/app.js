"use strict";

//Lets use async await with the Star Wars Database example.

const swapiFilms = async function() {
  let url = "https://swapi.dev/api/films/",
  filmsData = {},
  films = [];

  //What happens if we neglect the await keyword?  we get a pending promise, with the data unextracted. 
  //Await allows us to unpack the promise.
  filmsData = await fetch(url).then(data => data.json()); //Returns a promise with data embedded

  //Processing Data:
  //Using the results we get from the fetch, we want to get the titles of the films.
  //films = filmsData.results.map((obj) => obj.title); //Map automatically makes an array, recall.
  console.log(filmsData);

};

swapiFilms();

console.log("Remaining Code");
