module.exports = (req, res, next) => {
  const logger = require("../modules/loggers/middleware");
  const logName = "withCors";
  const logPrefix = logName + " - ";

  logger.debug(logName);

  const headers = {
    "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "*",
    "Access-Control-Allow-Headers": "*"
  };

  Object.keys(headers).forEach(key =>
    logger.debug(`${logPrefix}${key}: ${headers[key]}`)
  );

  res.set(headers);

  next();
};
