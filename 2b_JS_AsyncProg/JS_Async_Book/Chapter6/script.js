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

var promise = delay(1000, 0.5);
//Notice that our two anon funcitons are plugged into resolve, reject above...
//Our defined promise is partially defined, untill we plug in success/reject functions with the .then() method.
promise.then(function(r) {
    console.log("Resolved was successful, r=" + r);
}, function (r) {
    console.log("Reject has occured, r=" + r);
});