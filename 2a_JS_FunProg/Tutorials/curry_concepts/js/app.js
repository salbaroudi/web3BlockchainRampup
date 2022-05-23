
//Instead of writing console.log("Hello" + (personname>), everytime, we can
//create an unary function.

const curryGreeting = function(greeting) {
    return function(name) {
        console.log(greeting + " " + name);
    };
};

//Why does this work? The inner function creates closure over the greeting variable.

//We create a partially defined function, that we can use to insert a name
const welcomeGreet = curryGreeting("Welcome");

//Completing the function gives us our greeting functionality.
welcomeGreet("Steve");
welcomeGreet("Mary");
