module.exports = (req, res, next) => {
  const { getTokenFromHttpHeader } = require("./utils");
  const logger = require("../modules/loggers/middleware");
  const logName = "getAuthToken";
  const logPrefix = logName + " - ";

  logger.verbose(logName);

  const token = getTokenFromHttpHeader(req.header("Authorization"));

  logger.debug(logPrefix + "token: %s", token);

  req.body.authToken = token || null;

  next();
};
