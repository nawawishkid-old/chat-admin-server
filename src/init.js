/**
 * Express app instance with global app config variables
 */

const express = require("express");
const init = app => {
  app = require("./configs/app")(app);
  app = require("./configs/logger")(app);
  app = require("./configs/db")(app);
  app = require("./configs/redis")(app);

  return app;
};

const app = init(express());

module.exports = app;
