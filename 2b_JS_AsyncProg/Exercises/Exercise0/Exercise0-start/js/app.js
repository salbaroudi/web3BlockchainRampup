/*
Take a moment and analyze this code. What would it take to make it asynchronous using setTimeout?
Try a few things and see how they work.
*/
let students = [{name:"Mary",score:90,school:"East"},
{name:"James",score:100,school:"East"},
{name:"Steve",score:40,school:"East"},
{name:"Gabe",score:90,school:"West"},
{name:"Rachel",score:85,school:"East"},
{name:"Rochelle",score:95,school:"West"},
{name:"Lynette",score:75,school:"East"}];

let processStudents = function(data, callback) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].school.toLowerCase() === "east") {
            if (typeof callback === "function") {
                callback(data[i]);
                //This will give us a total of zero - we run the end of determineTotal.
                //setTimeout(callback,3000,data[i]);
            }
        }
    }
}

console.log("Before determineTotal");

let determineTotal = function() {
    let total = 0,
        count = 0;

    let innerFunction = function(obj) {
        total = total + obj.score;
        count++;
    }

    //Will not run in time - total and count zero'ed out.
    //setTimeout(processStudents,5000,students, innerFunction);
    processStudents(students, innerFunction);

    console.log("Total Score: " + total + " - Total Count: " + count);
}
//Answer: set it here, so End of Code statement will occur first.

setTimeout(determineTotal,500);
console.log("End of code.")

//So can we make this asychronous? Not really. We need our processStudent to run fully to tally our
//results.
