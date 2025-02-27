// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
import express from "express";
//load the quotes JSON
import fs from "fs";

// Read and parse the JSON file
const quotes = JSON.parse(fs.readFileSync("./quotes.json", "utf-8"));

const app = express();
const port = 3001;
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", (request, response) => {
  response.json(quotes);
});

app.get("/quotes/random", (request, response) => {
  response.json(pickFromArray(quotes));
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
const pickFromArray = (arrayofQuotes) =>
  arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

//Start our server so that it listens for HTTP requests!
const listener = app.listen(port, () => {
  console.log(
    "Your app is listening on port http://localhost:" + listener.address().port
  );
});
