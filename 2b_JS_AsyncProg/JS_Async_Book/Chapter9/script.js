
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