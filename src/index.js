const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

const customers = [];

app.use(express.json());

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidv4();
  customers.push({
    cpf,
    name,
    id,
    statement: []
  });

  console.log(customers);
  return res.status(201).send();
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

const listener = app.listen(3333, () => {
  console.log(`Server running on port ${listener.address().port} 🚀`);
});