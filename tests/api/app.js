const path = require("path");

// Test environment
require("dotenv").config({
  path: path.resolve("tests/env")
});

// Let chai-http initializes server, we just provide the app.
const app = require("../../src/app");
const db = require("../../src/modules/database");

const logLevel = app.get("log level");
const host = app.get("mongodb host");
const port = app.get("mongodb port");
const name = app.get("mongodb db name");
const username = app.get("mongodb db username");
const password = app.get("mongodb db password");
const authSrc = app.get("mongodb auth source");
const isDebug = app.get("mongodb debug") === "on";
const connection = db.connect({
  host,
  port,
  name,
  username,
  password,
  authSrc,
  isDebug
})();

module.exports = app;
