const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

let customers = [];

router.get("/", (req, res) => {
  res.json(customers);
});

router.post("/", (req, res) => {
  const { name, email, phone } = req.body;

  // 1. Empty check
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 2. Name validation
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "Name must be at least 3 characters" });
  }

  // 3. Email validation
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // 4. Phone validation (Indian format)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      message: "Phone must be 10 digits and start with 6-9",
    });
  }

  
  const emailExists = customers.find((c) => c.email === email);
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // 6. Create customer
  const newCustomer = {
    id: uuidv4(),
    name: name.trim(),
    email: email.trim(),
    phone,
  };

  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  customers = customers.filter((c) => c.id !== id);
  res.json({ message: "Deleted" });
});

module.exports = router;
