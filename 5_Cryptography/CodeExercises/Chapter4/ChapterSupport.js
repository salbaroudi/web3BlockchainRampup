/* For Chapter 4, I implement a JS Class to perform operations in GEF(2),
for questions in the book.

We will be implementing GF(2^m) with coefficents and plain operations over
GF(2). As this is an extension field, our Field operations will be modified.

Firstly, our field elements are interpreted as all GF(2) polynomials upto
(and including) degree m-1.

1) Addition and Subtraction (+) will stay the same.

2) Multiplication and Inverse will be done Modulo P(x) - via a chosen
irreducable polynomial of degree (m).

Note: For a particular GEF - user will have to provide an irreducible polynomal,
which are supplied by the textbook

*/


/*
class GEFPoly

Polynomials are objects with bit arrays embedded in them.
Order of stored terms is the same as english writing (higher order terms L to R)

We implement Multiplication and Addition, and imperatively perform operations
on bit arrays. Our model is built to perform calcualtions, and does not
fundamentally mimic the struture of the underlying mathematics.


*/

class GEFPoly {
  constructor(letter,termArr) {
    //Check if inputs make sense.
    if (!(termArr instanceof Array)) {
      throw("Error: Polynomial coefficients must be passed via Array datatype. Check input.");
    }

    for (const i of termArr) {
      if (!(i == 0 || i == 1)) {
        throw("Error: Terms Array has values other than 0 or 1. We are in GF(2). Check input.");
      }
    }
      this.letter = letter.toUpperCase();
      this.degree = (termArr.length - 1);
      this.termArr = termArr;
  }

  //As we are doing Ops in GF(2), this is also our subtraction method!
  //Return A new polynomial as an output.
  add(poly2) {
    if (!(poly2 instanceof GEFPoly)) {
      throw("Error: Passed Object is not of class GEFPoly. Check input.");
    }
    if (this.termArr.length == 0 || poly2.termArr.length == 0) {
      throw("Error: One of the arrays has no terms (Empty/Undefined).")
    }
    //make deep copies to start  - one will be extended in length.
    let poly1Arr = JSON.parse(JSON.stringify(this.termArr));
    let poly2Arr = JSON.parse(JSON.stringify(poly2.termArr));

    //We just need to align the arrays correctly, and perform a XOR operation.
    //case 1: Poly2 has a larger degree.
    let diff = this.degree - poly2.degree;
    if (diff > 0) {
      for (let i = 0; i < diff ; i++) {
        poly2Arr.unshift(0);
      }
    }
    if (diff < 0) {
      for (let i = 0; i > diff ; i--) {
        poly1Arr.unshift(0);
      }
    }

    //Now let us perform the XOR Operation
    const maxLen = Math.max(poly1Arr.length, poly2Arr.length);
    let retArr = new Array();

    for (let j = 0; j < maxLen; j++) {
      retArr[j] = poly1Arr[j] ^ poly2Arr[j];

    }
    console.log(retArr);
    return new GEFPoly("R",retArr);
  }

  //Print out our objects.
  tostring() {
    var printString = this.letter + "(X):  ";
    let degreeCount = this.degree; //Array index notation
    for (let i = 0; i < degreeCount;i++) { //Avoid last element (special constant)
      if (this.termArr[i] == 1) {
        printString += " x^" + (degreeCount - i) + " +";
      }
    }
    //last element:
    if (this.termArr[degreeCount] == 1) {
      printString += " 1..";
    }

    return printString.slice(0,-2); //dirty hack...could not get else statement to work (??).
  }

  /*Iterate on the polynomial referenced by this, and multiply out the
  terms. We start with a clone of polyA's state, and mutate its
  internal array as we do GF(2) operations.
  */
  plainmult(polyB,name) {
    //The Usual Checks.
    if (!(polyB instanceof GEFPoly)) {
      throw("Error: Passed Object is not of class GEFPoly. Check input.");
    }
    if (this.termArr.length == 0 || polyB.termArr.length == 0) {
      throw("Error: One of the arrays has no terms (Empty/Undefined).")
    }

    //First calculate the degree of a new polynomial
    let resultDegree = (this.termArr.length  - 1) + (polyB.termArr.length - 1);
    let resultArr = new Array(resultDegree+1).fill(0);

    //Our "This" array is our outer loop iteration.
    //Our PolyB array is our inner loop iteration.
    let outerArr = JSON.parse(JSON.stringify(this.termArr));
    let innerArr = JSON.parse(JSON.stringify(polyB.termArr));
    let outDeg = 0;
    let inDeg = 0;
    let resultPos = 0;

    for (let i = 0; i < outerArr.length; i++) {
      if (outerArr[i] == 0) { //zero outer term - skip
        continue;
      }
      outDeg = (outerArr.length - 1) - i
      for (let j = 0; j < innerArr.length; j++) {
        if (innerArr[j] == 0) { //zero inner term - skip.
          continue;
        }
        inDeg = (innerArr.length - 1) - j;
        resultPos = (resultArr.length - 1) - (outDeg + inDeg);
        resultArr[resultPos] = resultArr[resultPos] ^ 1;
      }
    }
    return new GEFPoly(name,resultArr);
  }

    modmult() {
      return 0;
    }


  }

//Basic function for our ad-hoc testing suite.
function testEval (input,expect,number) {
  if (input == expect) { console.log("Test " + number + "  passed"); }
  else { console.log("Test " + number + "  failed"); }
}

//Test 1a: Representattion of Polynomials:
testEval(new GEFPoly("P",[1,1,1,1]).tostring(),
"P(X):   x^3 + x^2 + x^1 + 1", "1a");

testEval(new GEFPoly("Q",[1,0,1]).tostring(),
"Q(X):   x^2 + 1", "1b");

//Test 2: bad data type for add()
//P.add("bad string");

//Test 3: Lets test the add function more thoroughly:
let P1 = new GEFPoly("P1",[1,1,0,0,0,0,1]);
let Q1 = new GEFPoly("Q1",[1,1,1]);
let R1 = P1.add(Q1);
testEval(R1.tostring(),
"R(X):   x^6 + x^5 + x^2 + x^1", "3a");

let P2 = new GEFPoly("P2",[1,0,1]); //diff > 0
let Q2 = new GEFPoly("Q2",[1,1,1,0,0,0,0,0,1]); //diff < 0
let R2 = P2.add(Q2);
testEval(R2.tostring(),
"R(X):   x^8 + x^7 + x^6 + x^2", "3b");

let P3 = new GEFPoly("P3",[1,0,0]);
let Q3 = new GEFPoly("Q3",[1,1,1]); //Same size test.
let R3 = P3.add(Q3);
testEval(R3.tostring(),
"R(X):   x^1 + 1", "3c");

let P4 = new GEFPoly("P4",[1,0,0,0,1,0,0,0,0]);
let Q4 = new GEFPoly("Q4",[1]); //Same size test.
let R4 = P4.add(Q4);
testEval(R4.tostring(),
"R(X):   x^8 + x^4 + 1", "3d");

//Test 4a: Testing out our plain polynomial multiplication!
let P5 = new GEFPoly("P5", [1,0,1,0,1]);
let Q5 = new GEFPoly("Q5", [1,0,1,0]);
let R5 = P5.plainmult(Q5,"R5");
testEval(R5.tostring(),
"R5(X):   x^7 + x^1", "4a");

//Test 4b: Multiplication by zero polynomial.
let P6 = new GEFPoly("P6", [0]);
let Q6 = new GEFPoly("Q6", [1,0,1,0]);
let R6 = P6.plainmult(Q6,"R6");
testEval(R6.tostring(),
"R6(X):", "4b");

//Test 4c: Multiplication by zero polynomial.
let P7 = new GEFPoly("P7", [1]);
let Q7 = new GEFPoly("Q7", [1,0,1,0]);
let R7 = P7.plainmult(Q7,"R7");
testEval(R7.tostring(),
"R7(X):   x^3 + x^1", "4c");

//Test 4d: Larger Example.
let P8 = new GEFPoly("P8", [1,1,0,0,1,0,0,1,0,1]);
let Q8 = new GEFPoly("Q8", [1,0,1,1,1,0,1,1]);
let R8 = P8.plainmult(Q8,"R8");
testEval(R8.tostring(),
"R8(X):   x^16 + x^15 + x^14 + x^12 + x^11 + x^5 + x^4 + x^2 + x^1 + 1", "4d");
