const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const noteRouter = require("./routes/routes");
const dotenv = require("dotenv");

const notesApp = express();
module.exports = notesApp;
// load dotenv
dotenv.config();

const PORT = process.env.PORT || 3000;

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
notesApp.use(bodyParser.json()); // parse json bodies into JS objects
notesApp.use(morgan("dev")); // log requests to the console (for dev)

// error handling middleware
notesApp.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
notesApp.get("/", (req, res) => {
  return res.json({ message: "home" });
});
notesApp.use("/notes", noteRouter);

notesApp.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
