const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let customers = [];

router.get("/", (req, res) => {
  res.json(customers);
});

router.post("/", (req, res) => {
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

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  customers = customers.filter(c => c.id !== id);
  res.json({ message: "Deleted" });
});

module.exports = router;