const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(cors());
app.use(express.json());

let customers = [];

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.post("/customers", (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newCustomer = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});

app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;

  customers = customers.filter(c => c.id !== id);

  res.json({ message: "Customer deleted" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});