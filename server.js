const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const validateTokenHandler = require("./middleware/validateTokenHandler");
const cors = require("cors");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.header("Access-Control-Allow-Methods", "*"); // Allow all methods
  res.header("Access-Control-Allow-Headers", "*"); // Allow all headers
  next();
});

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/todo", require("./routes/todoRoutes"));

app.use(errorHandler);
// app.use(cors());
// app.use(validateTokenHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
