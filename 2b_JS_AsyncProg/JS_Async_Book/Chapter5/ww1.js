 var state = {};
 state.k = 0;
 state.pi = 0;

 //Doesnt work - no alert function loaded with Worker!
// alert("Hello UI");

 var i;

 //This doesn't work, Worker thread doesn't get to its own
 //Event Queue.
 setInterval(this.postMessage(state), 500);
 
 for (i = 0; i < 10000000; i++) {
    state.k++;
    state.pi += 4*Math.pow(-1, state.k + 1) / (2 * state.k - 1);
    if (state.k % 1000 == 0) this.postMessage(state); 

}
 //Post Message sends event across threads, EL in UI will handle.
 this.postMessage(state);
 close();