const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

const customers = [];

app.use(express.json());

app.post("/account", (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return res.status(400).json({
      error: "Customer already exists!"
    });
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  });

  console.log(customers);
  return res.status(201).send();
});

app.get("/statement", (req, res) => {
  const { cpf } = req.headers;

  const customer = customers.find(customer => customer.cpf === cpf);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found!" });
  } 

  return res.json(customer.statement);
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

const listener = app.listen(3333, () => {
  console.log(`Server running on port ${listener.address().port} 🚀`);
});