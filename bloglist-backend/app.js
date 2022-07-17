const config = require("./utils/config");
const express = require("express");
require("express-async-errors");

const app = express();
const cors = require("cors");

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");


logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use(middleware.tokenExtractor);
app.use(middleware.requestLogger);

app.use("/api/blogs", middleware.tokenExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);


module.exports = app;
