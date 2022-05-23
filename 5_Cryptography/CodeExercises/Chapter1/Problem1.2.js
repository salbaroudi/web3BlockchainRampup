let cyphertext = "xultpaajcxitltlxaarpjhtiwtgxktghidhipxciwtvgtpilpitghlxiwiwtxgqadds";

//First we perform a letter frequency count:

let freqAnalysis = function(ctext) {
  var freqDict = new Map();
  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  //Initialize
  for (char in alphabet) {
    freqDict.set(alphabet[char], 0);
  }

  //Populate:
  for (char in ctext) {
    let target = ctext[char];
    if (target === " ") {
      continue;
    }
    freqDict.set(target, freqDict.get(target) + 1)
  }

  //Get Relative Frequencies
  for (char in alphabet) {
    let target = alphabet[char];
    if (target === " ") {
      continue;
    }
    freqDict.set(target, (freqDict.get(target)/cyphertext.length));
} //Disabled for easier counting by eye.
  return freqDict;
};

//From this:
let freqDict = freqAnalysis(cyphertext);


//Coding a shift cipher was a bit more of a pain than I realized. Code taken from:
//https://stackoverflow.com/questions/44232645/caesar-cipher-in-javascript

function cipherShift(str,shift) {
  str = str.toUpperCase();
  let rotShift = shift; //inner function can grab this.
  return str.replace(/[A-Z]/g, rot20);

  function rot20(correspondance) {
    const charCode = correspondance.charCodeAt();
    //A = 65, Z = 90
    return String.fromCharCode(
            ((charCode + rotShift) <= 90) ? charCode + rotShift
                                    : (charCode + rotShift) % 90 + 64
           );
  }
}

//Lets print all of the messages:
for (let i = 1; i < 26; i++) {
  console.log(cipherShift(cyphertext,i));
}

//and see what we get:
//"IFWEALLUNITEWEWILLCAUSETHERIVERSTOSTAINTHEGREATWATERSWITHTHEIRBLOOD"
//Tecumseh
