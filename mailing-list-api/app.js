const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const lists = new Map();
lists.set("staff", {
  name: "staff",
  members: ["talea@techtonica.org", "michelle@techtonica.org"],
});

// Read
app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

app.get("/lists", (req, res) => {
  res.status(200).json(Array.from(lists.keys())); // returns keys
});

app.get("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const list = lists.get(listName);

  if (!list) {
    res.status(404).send("List not found");
  } else {
    res.status(200).json(list);
  }
});

// Create
app.post("/lists", (req, res) => {
  const { name, members } = req.body;

  if (!name || !Array.isArray(members)) {
    return res.status(400).send("Invalid request body");
  }

  if (lists.has(name)) {
    return res.status(409).send("List already exists");
  }

  lists.set(name, { members });
  res.status(201).send("List created");
});

// Update
app.put("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const { members } = req.body;

  if (!Array.isArray(members)) {
    return res.status(400).send("Invalid request body");
  }

  if (!lists.has(listName)) {
    return res.status(404).send("List not found");
  }

  lists.set(listName, { members });
  res.status(200).send("List updated");
});

// Delete
app.delete("/lists/:name", (req, res) => {
  const listName = req.params.name;

  if (!lists.has(listName)) {
    res.status(404).send("List not found");
  } else {
    lists.delete(listName);
    res.status(200).send("List deleted");
  }
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});
