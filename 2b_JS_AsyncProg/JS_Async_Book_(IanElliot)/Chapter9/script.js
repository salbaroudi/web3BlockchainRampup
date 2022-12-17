
function delay(t,p) {
    var promise = new Promise(
        function (resolve, reject) {
            //It is at this point, where the asynchronous code actually runs (with SetTimeOut())
            setTimeout(
                function () {
                    var r = Math.random();
                    if (r > p) {
                        //4 - with SetTimeout done, we resolve. This sets a microtask immediately in the queue.
                        resolve(r);
                    }
                    else {
                        reject(r);
                    }
                },t);
        });
    return promise;
}

//This illustrates how async and await work.
//---------------------------------------------------
/*
async function myFun() {
    //1 - we await here, and return to the global call level.
    //3 - with nothing left to do, we wait for delay to return a promise.
    //5 - we return a promise with the resolve(r) value. Await unpackages it and places the value in first.
    var first=await delay(1000,0);
    //6-9 - The same steps as 1-5 are repeated again. Second gets a value loaded.
    var second=await delay(2000,0);

    //10 -We get to this synchronous code, and execute it.
    for (i = 0; i < 100000; i++) {
        if (i % 1000 === 0){
            console.log("Mark Inner");
        }
    }
    //11 - our final result is calculated, and returned in a Promise.
    return first+second;
}
//0 - we start our async call.
//12 - our Promise is returned, with a settled state. We call the onComplete callback, and extract the final value!
//13 - The End.
myFun().then(function(val) {console.log(val);});

//2 - we finish our computation here, and then go back to [1] where we were awaiting.
for (i = 0; i < 100000; i++) {
    if (i % 1000 === 0){
        console.log("Mark Outer");
    }
}

//Trying Flow of Control with raw Promises...
//Funnily enough, all 10 loops occur, and everything appears to return at once.
//There is no flow of control at all!!
//Note: You may not want flow of control. For exmaple: download 5 files in any order...
for (let i =0; i < 11; i++) {
    var promise = new Promise(function (resolve,reject) {
        setTimeout(function() {
            let r=Math.random();
            resolve(r);
        },1000);
    })
    promise.then((value) => {console.log(value)},null);
}

//Notice here, if we jsut used delay, we would be doing <Promise> < 0.5,
//Which makes no sense. You pull values out of Promises naturally, with await!!
async function myFun3() {
    if (await delay(5000,0) < 0.5) {
        console.log("Less than 0.5");
    } else {
        console.log("Greater than 0.5");
    }
}

myFun3()

//Lets take a look at error processing with all this.

async function myFun4() {
    try {
        var r = await delay(1000,1);
    } catch (v) {
        console.log("Error::" + v)
    }
    return r;
}

myFun4();

//Note if we don't use try catch, the Promise is returned in a rejected state.

//This will throw an Uncaught (promise error to console)
async function myFun5() {
    var r = await delay(2000,1);
    console.log("Rejected Promise::" + r)
    return r;
}

//This returns a rejected promise. The async return knows that the delay failed (somehow)?>
let hold = myFun5();

//Parallel Awaits:
//Notice that we use the same variable (r) for both awaits, but they return within
//100ms of each other (very quickly in console.
//This can only happen if, after re-entry of the p1 await, we immediately
//await the p2.
//Also notice that on going from one await statement to the other, we don't execute
//The console.log statements that have no variable dependence. Strange!!
//Finally, even if we await p1 for much longer than p2, p2 still executes after
//p1. So p1 is handled before p2, regardless of setTimeout time in delay.
async function myFun6() {
    var p1 = delay(5000,0);
    var p2 = delay(1000,0);
    var r = await p1;
    console.log("just after first await");
    console.log("p1 returned::" + r);
    var r = await p2;
    console.log("just after second await");
    console.log("p2 returned::" + r);
    return 0;
}

myFun6();
*/

//Final Visual Example (from text). A flashing div.

function pause(t) {
    var promise = new Promise(
        function (resolve, reject) {
            setTimeout( function() {
                resolve();
            },t);
        });
    return promise;
}

let fDiv = document.getElementById("fDiv");
//Similar to our parallel code above, the first await has to complete before
//The second, and our loop will not actulaly stack (which would cause fast flickering).
fDiv.addEventListener("click", 
    async function (event) {
        while (true) {
            fDiv.style.backgroundColor = "red";
            await pause(500);
            fDiv.style.backgroundColor = "white";
            await pause(500);
        }
    });