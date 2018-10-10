module.exports = (req, res, next) => {
  const { BASE_URL } = require("../configs").app;
  const logger = require("../modules/loggers/middleware");
  const logName = "setBaseUrl";
  const logPrefix = logName + " - ";

  logger.debug(logName);

  logger.debug(`${logPrefix}original URL: %s`, req.url);
  logger.debug(`${logPrefix}base URL: %s`, BASE_URL);

  if (req.url === "/") {
    next();

    return;
  }

  let baseUrl = BASE_URL || "";

  baseUrl = baseUrl.slice(-1) === "/" ? baseUrl.slice(0, -1) : baseUrl;
  req.url = req.url.slice(-1) === "/" ? req.url.slice(0, -1) : req.url;
  req.url =
    req.url.slice(0, baseUrl.length) === baseUrl
      ? req.url.slice(baseUrl.length)
      : req.url;

  logger.debug(`${logPrefix}set URL: %s`, req.url);

  next();
};
