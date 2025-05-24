const express = require("express");
const app = express();
const db = require("../models");
const port = 3000;
const aggregateRoutes = require("./routes/aggregator.routes");

db.sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error", err));

app.use(express.json());
app.use("/", aggregateRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
