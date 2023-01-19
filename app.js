// DEPENDENCIES
const cors = require("cors");
const express = require("express");

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

const picsController = require("./controllers/picController");

app.use("/pics", picsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Views");
});

// 404 PAGE
app.get("*", (req, res) => {
    res.status(404).send("Page not found");
  });

// EXPORT
module.exports = app;