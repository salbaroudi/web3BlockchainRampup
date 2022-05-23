//Currying: we will take a funciton that has high arity, and convert it
//to a series of functions of single arity.


//Differences: Partial Application and Currying??


//Example 1: We start with:

const ffun = function(a,b,c) {
  return a + b + c;
};

const gfun = function(d,e) {
  return d + e;
};

const hfun = function(f,g,h) {
  return f + g + h;
};

//As coding a general currying function is non-trivial, we use Kyle Simpson's in atjs.js
//Approach 1:
const curryF = curry(ffun);
const curryG = curry(gfun);
const curryH = curry(hfun);

const newFun = pipe(
  curryF(1)(2), //Note that one value is missing. Function unary - we pass the last value to start the call.
  curryG(4), //Same as above - but the last value supplied will be cF(1,2,3)
  curryH(5)(6)); //Same as above, but the last value will be cH(5,6,<partialsum>)


//Approach 2:
//Or, we can curry the function as we compose it

const newFun2 = pipe(curry(ffun)(1)(2),
curry(gfun)(4),
curry(hfun)(5)(6));

//Example 2:

const doubleNum = function(num) {
  return num + num;
};

const totalIt = function(n1,n2,n3,n4) {
  return n1 + n2 + n3 + n4;
};

const doArray = function(num1,num2) {
  return [num1, num2];
};
 //In this composite example, we double a number, throw its result into the totalIt function with three other numbers,
 //and take that result, and put it in an array with some other value.
 //Let's try this with approach 2:

 const newFun3 = pipe(doubleNum,curry(totalIt)(3)(4)(5),curry(doArray)(6));
