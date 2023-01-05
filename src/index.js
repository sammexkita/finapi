const express = require('express');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World!"
  });
});

const listener = app.listen(3333, () => {
  console.log(`Server running on port ${listener.address().port} 🚀`);
});