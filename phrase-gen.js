let fs = require("fs");

let subjects = fs.readFileSync("./subjects.txt").toString('utf-8');
let prepositions = fs.readFileSync("./prepositions.txt").toString('utf-8');
let verbs = fs.readFileSync("./verbs.txt").toString('utf-8');
let artJargon = fs.readFileSync("./art-jargon.txt").toString('utf-8');

let subjectsText = subjects.split("\n");
let prepositionsText = prepositions.split("\n");
let verbsText = verbs.split("\n");
let artJargonText = artJargon.split("\n");

//Removes the whitespace line put in by default by text editor
subjectsText.pop();
prepositionsText.pop();
verbsText.pop();
artJargonText.pop();

//Generates a combination of a subject, a verb, and two art jargon terms connected with a preposition.
function genPhrase(){
  let subject = subjectsText[Math.floor(Math.random() * subjectsText.length)];
  let verb = verbsText[Math.floor(Math.random() * verbsText.length)];
  let preposition = prepositionsText[Math.floor(Math.random() * prepositionsText.length)];
  let jargon1 = artJargonText[Math.floor(Math.random() * artJargonText.length)];
  let jargon2 = artJargonText[Math.floor(Math.random() * artJargonText.length)];
  let sentence = subject + " " + verb  + " " + jargon1 + " " + preposition + " " + jargon2 + ".";
  console.log(sentence);
  return sentence;
}

genPhrase();
