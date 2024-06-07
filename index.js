const express = require("express");
var cors = require("cors");
const app = express();
const port = 3000;

const people = [
  { id: 1, name: "John Doe", email: "johndoe@example.com", age: 25 },
  { id: 2, name: "Jane Smith", email: "janesmith@example.com", age: 30 },
  { id: 3, name: "Tom Johnson", email: "tomjohnson@example.com", age: 35 },
];

app.use(express.json());

app.use(cors());

app.get("/people", (req, res) => {
  res.json(people);
});

app.get("/people/:id", (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json("Person not found");
  res.json(person);
});

app.post("/people", (req, res) => {
  const person = {
    id: people.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  };
  people.push(person);
  res.json(person);
});

app.put("/people/:id", (req, res) => {
  const person = people.find((p) => p.id === parseInt(req.params.id));
  if (!person) return res.status(404).json("Person not found");
  person.name = req.body.name;
  person.email = req.body.email;
  person.age = req.body.age;
  res.json(person);
});

app.delete("/people/:id", (req, res) => {
  const personIndex = people.findIndex((p) => p.id === parseInt(req.params.id));
  if (personIndex === -1) return res.status(404).json("Person not found");
  const deletedPerson = people.splice(personIndex, 1);
  res.json(deletedPerson[0]);
});

app.listen(port, () => {
  console.log(`MSG: Server is running on port ${port}`);
});
