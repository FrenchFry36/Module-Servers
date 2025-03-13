process.env.PORT = process.env.PORT || 9090;
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";

const app = express();

app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.json()); // To parse JSON data
app.use(cors());

// Get __dirname in ES module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

// GET (read) all messages
app.get("/messages", async (req, res) => {
  const messages = await readData();
  res.status(200).send(messages);
});

// POST (create) a message
app.post("/messages", async (req, res) => {
  const { from, text } = req.body;

  if (!from || !text) {
    return res.status(400).send("Name and message are required!");
  }

  const messages = await readData();
  const newMessage = { id: messages.length, from, text };
  messages.push(newMessage);
  await storeMessage(messages);

  res.send("Message received");
  console.log("New message received:", newMessage);
});

// GET (read) a specific message (by ID)
app.get("/messages/:id", async (req, res) => {
  const messageId = Number(req.params.id);
  const messages = await readData();
  const message = messages.find((message) => message.id === messageId);
  res.status(200).send(message);
});

//  DELETE a specific message (by ID)
app.delete("/messages/:id", async (req, res) => {
  const messageId = Number(req.params.id);
  const messages = await readData();
  const updatedMessages = messages.filter(
    (message) => message.id !== messageId
  );
  await storeMessage(updatedMessages);
});

// Retrieve data.json
const readData = async () => {
  const messages = await fs.readFile(
    path.join(__dirname, "data", "data.json"),
    "utf-8"
  );
  return JSON.parse(messages);
};

// Updates movies.json
let storeMessage = async (movies) => {
  await fs.writeFile(
    path.join(__dirname, "data", "data.json"),
    JSON.stringify(movies, null, 2)
  );
};

app.listen(process.env.PORT, () => {
  console.log(`listening on http://localhost:${process.env.PORT}...`);
});
