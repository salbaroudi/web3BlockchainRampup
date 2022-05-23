str = 'Innovation distinguishes between a leader and a follower.';

const trim = str => str.replace(/^\s*|\s*$/g, '');

const noPunct = str => str.replace(/[?.,!]/g,'');

const capitalize = str => str.toUpperCase();

const breakout = str => str.split(" ");

const noArticles = str => (str !== "A" && str !== "AN" && str !== "THE");

const filterArticles = arr => arr.filter(noArticles);


/*This is the traditional (nested) way to compose functions.

Notice that the order of operations is L to R, but we read R to L.

The notation is also awkward with all of the parentheses.
*/

console.log(filterArticles(breakout(capitalize(noPunct(trim(str))))));

/* The second way we can compose functions is via the pipe function.
We have more code, but it is written as a function and can be succinctly called.
We also have arguments listed in the order we want them applied.

This is the most desirable result.
*/

//Notice our use of the Spread Operator in the argument header.
//We also have two nested anonymous functions!
const pipe = function(...fns) {
    return function(x) {
        return fns.reduce(function(v, f) {
            return f(v);
        }, x);
    }
};


//Usage for Pipe:
const prepareString1 = pipe(
    trim,
    noPunct,
    capitalize,
    breakout,
    filterArticles);

console.log(prepareString1);

/* Same modular setup as the pipe function, but the arguments reversed just
like the nested method.
*/

const compose = function(...fns) {
    return function(x) {
        return fns.reduce(function(v, f) {
            return f(v);
        }, x);
    }
};

//Usage for Compose:
const prepareString2 = compose(
    filterArticles,
    breakout,
    capitalize,
    noPunct,
    trim);

console.log(prepareString2(str));
