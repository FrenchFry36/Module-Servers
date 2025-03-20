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
  const listsArray = Array.from(lists.keys()); // creates list of keys
  res.status(200).json(listsArray); // returns keys
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

// Create & update
app.put("/lists/:name", (req, res) => {
  const listName = req.params.name;
  const { name, members } = req.body;

  if (name !== listName) {
    return res.status(400).send("List name in path and body do not match");
  }

  if (lists.has(listName)) {
    lists.set(listName, { name, members });
    res.status(200).send("List updated");
  } else {
    lists.set(listName, { name, members });
    res.status(200).send("List created");
  }
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
