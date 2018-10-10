module.exports = (req, res, next) => {
  const logger = require("../modules/loggers/middleware");
  const appLogger = require("../modules/loggers/app");
  const logName = "requestLogger";
  const logPrefix = logName + " - ";
  const requestMsg = `${req.method.toUpperCase()} ${req.path} ${req.get(
    "user-agent"
  )}`;

  logger.debug(logName);
  logger.debug(`${logPrefix}${requestMsg}`);
  logger.debug(`${logPrefix}req.body: %s`, JSON.stringify(req.body));
  appLogger.info(requestMsg);

  next();
};
