const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customers");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({
    origin: "http://localhost:5173",
  }));

app.use("/customers", customerRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
