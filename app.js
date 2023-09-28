const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/users");
// const tasksRouter= require ('.routes/api/tasks');
const reviewsRouter = require("./routes/api/reviews");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/users", authRouter);
// app.use("/tasks", tasksRouter);
app.use("/reviews", reviewsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
