//so lets start with a simple promise:
function delay(t,p) {
    var promise = new Promise(
        function (resolve, reject) {
            //It is at this point, where the asynchronous code actually runs (with SetTimeOut())
            setTimeout(
                function () {
                    var r = Math.random();
                    if (r > p) {
                        resolve(r);
                    }
                    else {
                        reject(r);
                    }
                },t);
        });
    return promise;
}

/*
var promise = delay(1000, 0.5);
//Notice that our two anon funcitons are plugged into resolve, reject above...
//Our defined promise is partially defined, untill we plug in success/reject functions with the .then() method.
promise.then(function(r) {
    console.log("Resolved was successful, r=" + r);
}, function (r) {
    console.log("Reject has occured, r=" + r);
});


//Next lets look at a basic promise chain.
//Again, delay returns a Promise Object with a partially defined
//function as its argument.
var myPromise1 = delay(5000,0);
//The then function completes our partial function (resolve).
//Notice that we ignored our reject argument.

//Our resolve function does not create a Promise manually. it returns
//string, and the JS Engine wraps it in another Promise Object automatically for us.

var myPromise2 = myPromise1.then(
    function (value) {
        console.log(value);
        return "Hello";
});

//Our returned promise stores Hello, we print it. The end
myPromise2.then(function (value) {
    console.log(value);
}); 

//We can make this code more terse, by eliminating the Explicit promise
//variables:

delay(1000,0).then(function (value) {
    console.log(value);
    return "Hello";
}).then( function (value) {
    console.log("Our Terse Promise Returns: " + value);
});



//Note the following: We can just call Delay on its own, and a promise is returned
//and settled!

delay(1000,0);
*/
//Lets look at a long chain of promises, to understand them better.

function delay2(t,p,name) {
    var promise = new Promise(
        function (resolve, reject) {
            //It is at this point, where the asynchronous code actually runs (with SetTimeOut())
            setTimeout(
                function () {
                    var r = Math.random();
                    let hold = {"r":r,"name":name};
                    if (r > p) {
                        resolve(hold);
                    }
                    else {
                        reject(hold);
                    }
                },t);
        });
    return promise;
}


//We start off with Delay returning a promise.
//Notice that these return in the order they are called,
//It doesn't matter where you place a long waiting delay (1st, 3rd, etc).
//If promise k has a long delay, k+1,.....n will be held up.
var aPromise1 = delay2(10000,0,"one");
var aPromise2 = aPromise1.then(
    function (value) {
        console.log(value.name + " returned with " + value.r );
        return delay2(10000,0,"two");
    });

    //Then returns/wraps a promise. Not the callback itself.
    //Although in this case, our delay does make a promise.
var aPromise3 = aPromise2.then(
    function (value) {
        console.log(value.name + " returned with " + value.r );
        return delay2(10000,0,"three");
    });

//Promise k must wait for promise k-1 to resolve, in general.
//Interestingly, if we set the final delay2 to a very high wait time,
//it returns quickly.
var aPromise4 = aPromise3.then(
    function (value) {
        console.log(value.name + " returned with " + value.r );
        return delay2(10000,0,"four");
    });
    
aPromise4.then(function (value) {
    console.log(value.name + " returned with " + value.r );
    console.log("The End.");
});

//Promises of course don't have to be chained. They can be run 
//in parallel by making them independent
delay2(2000,0,"parallel1").then(function (value) {
    console.log(value);});

delay2(2000,0,"parallel2").then(function (value) {
    console.log(value);});


//The two sets of statements below return the same outputs, 
//but are not conceptually the same. Be careful!

delay2(2000,0,"statement1").then(function (value) {
    console.log("Resolve 1");});

delay2(2000,0,"statement2").then(function (value) {
    console.log("Resolve2");});

//In particular, our first then produces a Promise for the next then. 
//We still get the same output, however
delay2(2000,0,"chaining").then(function (value) {
    console.log("Resolve 1");}).then(function (value) {
    console.log("Resolve2");});


//Note that not all callbacks supplied to functions need to be anonymous.
//We can use named functions, as below:

let name1 = function (value) {
    console.log(value);
}

let error1 = function (value) {
    console.log("ERROR!")
}

//50/50 chance we get success or error.
var namedPromises1 = delay2(3000,1,"named1");
//Notice that we don't have to list arguments, just the name!
var namedPromises2 = namedPromises1.then(name1, error1)

//So now lets test the Promise.all() functionality:

var allPromise1 = delay(1000,0);
var allPromise2 = delay(3000,0);
myTotalPromise = Promise.all([allPromise1, allPromise2]);

//We wait until all promises resolve, and we return an array of results. 
myTotalPromise.then( function (values) {
    console.log("first all value" +values[0]);
    console.log("second all value" +values[1]);
});

//And the promise.race() function.
var racePromise1 = delay(1000,.5);
var racePromise2 = delay(1000,.5);
myRacePromise = Promise.race([racePromise1, racePromise2]);

myRacePromise.then( function (value) {
    console.log("success");
    console.log(value);
}, function (value) {
    console.log("fail");
    console.log(value);
});

//And the promise.race() function.