"use strict";

const moviePlanets = async function(movieNum) {
  let url = 'https://swapi.dev/api/films/';

  try {
      if (isNaN(movieNum)) {
        throw "You must pass in a number."
      }
      //lets wait for this to return
      //If we don't await, we get an error from map: missing promises!
      let movieObj = await $.getJSON(url + movieNum + "/");

      console.log(movieObj); //planets are just URLS in this object - not populated.

      //Get all of the Promises for the Planets, and then examine
      //each promise and extract data for Planet
      let promises = await movieObj.planets.map(url => $.getJSON(url));

      console.log(promises);

      //loop through an iterable without imperiative boilerplate
      //we make sure each promise has completed, before we start printing names.
      //If we skip await here, we get 5 undefined values!!
      for await (let pl of promises) {
        console.log(pl.name)
      };

  } catch(e) {
    console.error(e);
  }


};



/*
const moviePlanets = function(movieNum) {
    let url = 'https://swapi.dev/api/films/';

    $.getJSON(url + movieNum + '/')
    .then(function(response) {
        console.log(response.title);

        response.planets.forEach(p => $.getJSON(p).then(pl => console.log(pl.name)));
    })
    .catch(reject => console.log(`Couldn't retrieve films: ${reject}`));
};

*/
moviePlanets("2asd");

console.log("Remaining Code")
