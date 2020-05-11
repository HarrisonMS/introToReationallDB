const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("<h3>Its workinggg</h3>");
});

module.exports = server;
