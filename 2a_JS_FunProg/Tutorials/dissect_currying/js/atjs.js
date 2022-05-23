
//We see immediately that the curry function is recursive.
//It relies on a chain of closures, to build up parameters one at a time.
//At the very end, the IF case is invoked, and the original funciton is called
//On the built up arguments.

function curry(fn,arity = fn.length) {
    return (function nextCurried(prevArgs){ //returns an inner function, that has partial arguments built up.
        return function curried(nextArg){
          console.log(prevArgs);
          console.log(nextArg);
            var args = [ ...prevArgs, nextArg ];
            if (args.length >= arity) {
                return fn( ...args );
            }
            else {
                return nextCurried( args );
            }
        };
    })( [] ); //The first function is immediately invoked with an empty array!
}




const pipe = function(...fns) {
    return function(x) {
        return fns.reduce(function(v, f) {
            return f(v);
        }, x);
    }
};

const compose = function(...fns) {
    return function(x) {
        return fns.reduceRight(function(v, f) {
            return f(v);
        }, x);
    }
};
