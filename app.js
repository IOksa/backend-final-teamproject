const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const tasksRouter = require("./routes/api/tasks");
const reviewsRouter = require("./routes/api/reviews");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use("/tasks", tasksRouter);
app.use("/reviews", reviewsRouter);

// auth google
const authGoogleRouter = require("./routes/authGoogleRouter");
app.use("/auth", authGoogleRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
