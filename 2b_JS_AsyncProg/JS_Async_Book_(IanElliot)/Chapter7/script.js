//Before we begin with how to wrap code with Promises, we need to understand
//How basic javascript implements private variables and functions. 
//Basic javascript classes are more like containers, with every field set to private.

//Example 1: lets use a functional closure to make a variable private.
function myConstructor() {
    var private=0;
    this.myFunction=function() {
        alert(private);
    }
}
/*The book says that this should throw an error. It does not.
In fact, if we call myFunction we get a return value of 0 which is inalterable.
However we can set a mutable attribute called "private" after creation that = 1.

So we can't see the original "private" variable, but it does not throw an error.
*/
var myObject = new myConstructor();
myObject.private=1;

//Example 2: Next, the Book wants to set a private variable when the constructor
//Is used. Lets try it.


function myClass(value) {
    var myPrivateVar = value;
    this.myMethod=function() {console.log(myPrivateVar);}
}

//Same things happen again. No restrictions. The original myPrivateVar can
//be read but not changed, and we can set a myPrivateVar attribute that is independent
//of the original value.
var myObject2 = new myClass(10);
myObject2.myMethod();

//Example 3: We make a basic "private reveal" method mechanism.
//Note we must place reveal in func()'s arg slot, or after closure is done, it won't have access!
function myClass2(func) {
    var myPrivateVar = Math.random();
    var reveal = function () {
        return myPrivateVar;
    }
    func(reveal);
}

//This works because we are using functions, and we cannot inspect variable statements (they are private anyways.)
var myObject = new myClass2(
    function (revealArg) {
        console.log(revealArg());
    });


//Next let us look at some practical Promise Programming.
//---------------------------------------------------------------


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

//In this example, we implement an "any" Promise function. We resolve() to the first promise that is fulfilled, or reject()
//if all promises reject().

function any(args) {
    var number = args.length;
    var p = new Promise(
        function (resolve, reject) {
            args.map(
                function (p) {
                    p.then( 
                        function (value) {
                            resolve(value);
                        },
                        function (error) {
                            if (--number === 0) {
                                reject(error);
                            }
                        }
                    );
                });
        });
    return p;
}

//Notice here that we just left the promise on its own. We get an error about reject(), as we have not applied a .then function.
//however, if our results leads to resolutoin (resolve()...), the promise gets fulfilled, its value filled in, and there are no complaints from JS.
let p1 = delay(3000,1);
let p2 = delay(4000,1);
let p3 = delay(5000,1);
let pT = any([p1,p2,p3]);

//We can remove the JS error by just using then.

pT.then((value) => {console.log("Success, value is=" + value)}, (value) => {console.log("Failure, value is=" + value)});


//Another Exmaple. Suppose we want a timeOut function. We set a promise, and fix a timeout to give up and move on:
//Here, we return a promise with the following executor logic:
//take our given promise, and add callbacks with THEN. Next, set up a race condition with setTimeout. Use private R/R to force the result either way.
function timeOut(p,t) {
    var promise = new Promise( 
        function (resolve, reject) {
            p.then(function (value) {
                resolve(value);
            }, function (error) {
            reject(error);
            });
            setTimeout(function () {
                reject("timeout");
            },t);
        });
    return promise;
}

var myPromise =  delay(10000,0);
timeOut(myPromise,5000).then((value) => {console.log("PASS")} , (value) => {console.log("FAIL")});

//Lets use Promises to work with our Pi Web Worker from Chapter 5:

function piWorker() {
    var worker = new Worker("pi.js");
    var promise = new Promise(
        function (resolve, reject) {
            worker.addEventListener("message", 
                    function (event) {
                        resolve(event.data)
                    });
        });
    return promise;
}

let button1 = document.getElementById("button1");

button1.addEventListener("click",
    function (event) {
        button1.setAttribute("disabled",true);
        piWorker().then(
            function (value) {
                result.innerHTML = value.pi;
                count.innerHTML = value.k;
                button1.setAttribute("disabled",false);
            });
    });
