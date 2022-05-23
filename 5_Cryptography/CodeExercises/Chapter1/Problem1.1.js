
let cyphertext = "lrvmnir bpr sumvbwvr jx bpr lmiwv yjeryrkbi jx qmbm wi bpr xjvni mkd ymibrut jx irhx wi bpr riirkvr jx ymbinlmtmipw utn qmumbr dj w ipmhh but bj rhnvwdmbr bpr yjeryrkbi jx bpr qmbm mvvjudwko bj yt wkbrusurbmbwjk lmird jk xjubt trmui jx ibndt wb wi kjb mk rmit bmiq bj rashmwk rmvp yjeryrkb mkd wbi iwokwxwvmkvr mkd ijyr ynib urymwk nkrashmwkrd bj ower mvjyshrbr rashmkmbwjk jkr cjnhd pmer bj lr fnmhwxwrd mkd wkiswurd bj invp mk rabrkb bpmb pr vjnhd urmvp bpr ibmbr jx rkhwopbrkrd  ywkd vmsmlhr jx urvjokwgwko ijnkdhrii ijnkd mkd ipmsrhrii ipmsr w dj kjb drry ytirhx bpr xwkmh mnbpjuwbt lnb yt rasruwrkvr cwbp qmbm pmi hrxb kj djnlb bpmb bpr xjhhjcwko wi bpr sujsru msshwvmbwjk mkd wkbrusurbmbwjk w jxxru yt bprjuwri wk bpr pjsr bpmb bpr riirkvr jx jqwkmcmk qmumbr cwhh urymwk wkbmvb";

//Convert cyphertext to an array we can manipulate.
let cypherArray = cyphertext.split(" ");

//Extract two letter words:

let oneArray = cypherArray.filter(item => (item.length == 1));

let twoArray = cypherArray.filter(item => (item.length == 2));

let threeArray = cypherArray.filter(item => (item.length == 3));

//Do Frequency Analysis: Use a javascript MAP:
let freqAnalysis = function() {
  var freqDict = new Map();
  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  //Initialize
  for (char in alphabet) {
    freqDict.set(alphabet[char], 0);
  }

  //Populate:
  for (char in cyphertext) {
    let target = cyphertext[char];
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
//    freqDict.set(target, (freqDict.get(target)/cyphertext.length));
} //Disabled for easier counting by eye.
  return freqDict;
};

//From this:
let freqDict = freqAnalysis();

//From this, I guess "R" is "e", "M" is "a" and "B" is "t".
//From three word array, "BPR" is "the", so "H" is "p". Lets substitute and
//See what we get:

var threeSub = []
for (item in threeArray) {
  threeSub.push(threeArray[item].replace("r","e")
  .replace("b","t")
  .replace("m","a")
  .replace("p","h"));
}

//From the threeSub, we get "AKD" is "and", so now "D" is the same, and "K" is "n"

let charSwapMessage = function(message,charFindArr,charSwapArr) {
  if (charFindArr.length != charSwapArr.length) {
    console.error("Character Map arrays not equal! Double Check");
  }
  for (index in charFindArr) {
      message = message.replaceAll(charFindArr[index], charSwapArr[index]);
  }
  return message;
}

var newMessage = charSwapMessage(cyphertext,"rbmpk","etahn")

//For the rest of the decoding, I do this in a text editor. This is because
//sequential guesses and substitutions can clobber results, making the
//text harder to decode.
//We take the top 10 letters in frequency scores, and map them to the
//English frequency table in the textbook.
