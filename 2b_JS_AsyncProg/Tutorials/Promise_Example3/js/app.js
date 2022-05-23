"use strict";

const moviePlanets = function(movieNum) {
  let baseURL = 'http://swapi.dev/api/films/'

  //Dollar sign is a jQuery operator to access a library/
  $.getJSON(baseURL + movieNum + "/") //already returned in object parsed format
  .then(function(response) { //We return a particular movie record
    console.log(response.title);

    //From our movie record, we get all the planets and print their names
    response.planets.map( //use map instead of forEach!!
      p => $.getJSON(p).then(pl => console.log(pl.name))
    );
  })
  .catch(reject => console.log(reject));

};

moviePlanets(6);
