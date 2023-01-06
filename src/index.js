const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

const customers = [];

function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find(customer => customer.cpf === cpf);
  
  if (!customer) {
    return res.status(404).json({ error: "Customer not found!" });
  } 

  req.customer = customer;

  return next();
}

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

app.get("/statement", verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;
  return res.json(customer.statement);
});

app.post("/deposit", verifyIfExistsAccountCPF, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statemnentOperation = {
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  };

  customer.statement.push(statemnentOperation);

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