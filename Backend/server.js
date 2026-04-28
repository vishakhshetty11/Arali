const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customers");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/customers", customerRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
