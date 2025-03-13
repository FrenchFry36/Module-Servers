process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // To parse JSON data
app.use(cors());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
const messages = [
  welcomeMessage,
  {
    id: 1,
    from: "Lisa",
    text: "Hi, sorry",
  },
];

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

// GET (read) all messages
app.get("/messages", (req, res) => {
  res.status(200).send({ messages });
});

// POST (create) a message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;

  if (!from || !text) {
    return res.status(400).send("Name and message are required!");
  }

  const newMessage = { id: messages.length, from, text };
  messages.push(newMessage);

  res.send("Message received");
  console.log("New message received:", newMessage);
});

app.get("/messages/:id", (req, res) => {
  const messageId = Number(req.params.id);
  const message = messages.find((message) => message.id === messageId);
  res.status(200).send(message);
});

app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}...`);
});
