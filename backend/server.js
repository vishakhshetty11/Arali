const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customers");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://customer-management-six.vercel.app"],
  }),
);
app.use(express.json());

app.use("/customers", customerRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
