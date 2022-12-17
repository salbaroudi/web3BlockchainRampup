//For our first example, lets calculate Pi in small chunks (as seen in textbook):
function computePi() {
    var pi = 0;
    var k;

    let result = document.getElementById("result1");
    let count = document.getElementById("count1");

    for (k=1; k <= 100000; k++) {
        pi += 4 * Math.pow(-1, k+1) / (2 * k - 1);
        result.innerHTML=pi;
        count.innerHTML=k;
    }
}

//Doing this the simple way, our console freezes and takes <900ms to free up. Not acceptable!

let button1 = document.getElementById("button1");
button1.addEventListener("click",computePi);

//In our next example, we make a state object, and break the calculation into 1000 iteration chunks.
//Here we see that we run our calculation for a short time (1000 iters).
//We set timeout, and there is a brief window where the UI thread is running
//again. We see fluid updates, and our UI is still responsive with this.

//Async. There is no 4-10ms delay (as with setTimeout), so it should be a lot faster.
function computePiAsync() {
    var state = {};
    state.k = 0;
    state.pi = 0;

    function innerCompPi() {
        if (state.k >= 100000) return;
        var i;
        for (i = 0; i < 1000; i++) {
            state.k++;
            state.pi += 4*Math.pow(-1, state.k + 1)/(2*state.k -1);

        }
    result2.innerHTML=state.pi;
    count2.innerHTML=state.k;
    setTimeout(innerCompPi,0);
}
setTimeout(innerCompPi,0);
}

let button2 = document.getElementById("button2");
button2.addEventListener("click",computePiAsync);


//Next we see a practical application of the PostMessage method of 
//We see that this is about 10x faster than our setTimeOut async method above.
function computePiPostMessage() {
    var state = {};
    state.k = 0;
    state.pi = 0;
    window.addEventListener("message", innerCompPi,false);

    function innerCompPi() {
        if (state.k >= 100000) return;
        var i;
        for (i = 0; i < 1000; i++) {
            state.k++;
            state.pi += 4*Math.pow(-1, state.k + 1)/(2*state.k -1);

        }

    result3.innerHTML=state.pi;
    count3.innerHTML=state.k;
    window.postMessage("fireEvent","*");    
    }
    window.postMessage("fireEvent","*");    
}

let button3 = document.getElementById("button3");
button3.addEventListener("click",computePiPostMessage);

//Next let us basically understand Generator functions in Javascript.
//These utilize the yield keyword - which is a return statement that allows
//us to continue where we left of in a function we left.

//Our Generator definition. Note, this defines a kind of Object Factory.
//We don't literally run this. A lot of syntactic sugar behind the scenes,
//I bet.
function* myGenerator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

//Calling myGenerator returns an iterable object we can interact with.
var myGen = myGenerator();

//The myGen object has a next().value and .done property. 
console.log("Starting our sample Generator");
var hold = {};
hold = myGen.next();
console.log(hold.value);
console.log("is done?" + hold.done);
hold = myGen.next();
console.log(hold.value);
console.log("is done?" + hold.done);
hold = myGen.next();
console.log(hold.value);
console.log("is done?" + hold.done);

//So now, we can use generators to make a more terse Pi Calculator. Lets jump
//Straight to postMessage() to do this.


function* genComputePi() {
    var k;
    var pi = 0;
    //Notice that we yield break the loop using the if mod div.
    //when we call generator again, we come back to this loop!
    for (k=1; k <= 100000; k++) {
        pi += 4*Math.pow(-1,k+1) / (2 * k-1);
        if (Math.trunc(k / 1000) * 1000 == k) yield pi;
    }
    return pi;
}
function computePiGen() {
    //Our generator object has been created.
    var computePi = genComputePi();
    var pi;
    //Setup window for recieving message.
    window.addEventListener("message", resume, false);

    //Calls generator, posts result, sets up another generator call.
    function resume() {
        pi = computePi.next();
        result4.innerHTML = pi.value;
        //our generator is just returning one value, so no count.
        if (!pi.done) {
            window.postMessage("fireEvent", "*");
        }
        return;
    }
    //Start the first message
    window.postMessage("fireEvent", "*");
    return;
}

let button4 = document.getElementById("button4");
button4.addEventListener("click",computePiGen);