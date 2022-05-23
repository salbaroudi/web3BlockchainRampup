/*
What is this? Either Mainapp Object exists (below),
or we define mainapp as an empty object.

Why MainApp = MainApp? This is to protect against another devleoper
using mainapp. If you did MainAPP = {}, you would destroy their code!
It is better just to add to an already existing object, rather than destroy it.
[1]

Other Notes:
1) GET Request formation. As per the Wordnik API, scrabble Score Request (for "electric")

https://api.wordnik.com/v4/word.json/ {electric} / {scrabbleScore} ? api_key=YOURAPIKEY
*/

var MAINAPP = MAINAPP || {};

//IIFE to setup our environment.
(function(nsp) { //"NSP" means "NameSpace" [2]
    "use strict";

    let wordnikWord = "http://api.wordnik.com/v4/word.json/",
        apiKey = "?api_key=XXX",
        scrabScore = "/scrabbleScore",
        field = document.querySelector('#word'),
        btn = document.querySelector('#submitBtn'),
        results = document.querySelector('#results'),
        word,
        scrabbleVal = 0;

    const getValue = function(word) {
        fetch(wordnikWord + word + scrabScore + apiKey)
        .then(response => response.json())
        .then(obj => {
          console.log(obj.value);
          scrabbleVal = obj.value;
          results.innerHTML = obj.value;
        });
    };

    btn.addEventListener('click', function(e) {
        word = field.value;
        getValue(word); //when we click, the function above is activated.
    });

    nsp.scrabbleVal = scrabbleVal;
})(MAINAPP); //When it starts, we will pass in an empty object or provide an already existant MAINAPP object.

//References:
//[1] https://www.udemy.com/course/asynchronous-javascript-deep-dive/learn/lecture/16843376#questions/10796870
//[2] https://www.udemy.com/course/asynchronous-javascript-deep-dive/learn/lecture/16843376#questions/11879070
