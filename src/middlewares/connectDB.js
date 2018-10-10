module.exports = (req, res, next) => {
  const logger = require("../modules/loggers/middleware");
  const db = require("../database");

  logger.debug("connectDB");
  db.connect();

  next();
};
