
var redis = require('redis');
var Twit = require('twit');
var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

var REDIS_KEY = 'repliedTo';
function processTweet(tweet) {
    client.sadd(REDIS_KEY, tweet.user.id_str, function(err, reply) {
        if (err) {
            console.log(err);
        } else if (reply == 1 || tweet.user.screen_name == process.env.TWITTER_DEBUG_USER) {
            console.log('Never forget that art is dead.');
        } else {
            console.log('Like, art is super dead.');
        }
    });
}



let fs = require("fs");

//Generates text for mfa-thesis-bot to tweet;

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
  let preposition1 = prepositionsText[Math.floor(Math.random() * prepositionsText.length)];
  let preposition2 = prepositionsText[Math.floor(Math.random() * prepositionsText.length)];
  let jargon1 = artJargonText[Math.floor(Math.random() * artJargonText.length)];
  let jargon2 = artJargonText[Math.floor(Math.random() * artJargonText.length)];
  let jargon3 = artJargonText[Math.floor(Math.random() * artJargonText.length)];
  let sentence = subject + " " + verb  + " " + jargon1 + " " + preposition1 + " " + jargon2 + " " + preposition2 + " " + jargon3 + ".";
  return sentence;
}

//Posts tweet
T.post('statuses/update',
      {status: genPhrase()},
      (err, data, response) => {
      });

//Stream
var stream = T.stream('statuses/filter', { track: 'art is dead' });

      // stream.on('tweet', function (tweet) {
      //     console.log(genPhrase());
      // });

      stream.on('limit', function (limitMessage) {
          console.log(limitMessage);
      });

      stream.on('disconnect', function (disconnectMessage) {
          console.log(disconnectMessage);
      });

      stream.on('reconnect', function (request, response, connectInterval) {
          console.log('Reconnecting in ' + connectInterval + 'ms...');
      })

      stream.on('error', function(error) {
          console.log(error);
      });
