function* genComputePi() {
    var k;
    var pi = 0;
    //Notice that we yield break the loop using the if mod div.
    //when we call generator again, we come back to this loop!
    for (k=1; k <= 100000; k++) {
        pi += 4*Math.pow(-1,k+1) / (2 * k-1);
        if (Math.trunc(k / 1000) * 1000 == k) {
         yield pi;
        }
    }
    return pi;
}

//Notice that we only send our final message when done,
//If the UI has not prompted us.
function computePiAsync() {
    var computePi = genComputePi();
    function resume() {
        pi = computePi.next();
        if (!pi.done) {
            setTimeout(resume,0);
        }
        if (pi.done)
            this.postMessage(pi);
        return;
    }
    setTimeout(resume,0); //starts automatically.
    return;
}

//pi has been set to a global value, so the EL can reference it below...
var pi;
//this refers to the Worker itself.
//this handles our postMessages from the UI (commands)
this.addEventListener("message", function (event) {
    switch (event.data) {
        case "start":
            computePiAsync();
            break;
        case "update":
            this.postMessage(pi);
            break;
        case "stop":
            this.close();
            break;
    }
});