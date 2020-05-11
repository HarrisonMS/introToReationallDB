//express server global middlewares then router files requires
const express = require("express");
const server = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const accountsRouter = require("../accounts/accounts-router");

// Global middleware
server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());

// route handlers
server.use("/api/accounts", accountsRouter);
server.get("/", (req, res) => {
  res.send("<h3>Its workinggg</h3>");
});

module.exports = server;
