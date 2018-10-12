const path = require("path");

// Test environment
require("dotenv").config({
  path: path.resolve("tests/api/env")
});

// Let chai-http initializes server, we just provide the app.
const app = require("../../src/app");
const db = require("../../src/modules/database");

db.connect();

module.exports = app; 
