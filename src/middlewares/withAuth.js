module.exports = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const SECRET_KEY = require("../init").get("secret");
  const { getTokenFromHttpHeader } = require("./utils");
  const logger = require("../modules/loggers/middleware");
  const logName = "withAuth";
  const logPrefix = logName + " - ";
  const TOKEN = getTokenFromHttpHeader(req.header("Authorization"));

  logger.verbose(logName);

  if (!TOKEN) {
    res.set("WWW-Authenticate", "Bearer realm='chat admin'");
    res.sendStatus(401);

    return;
  }

  jwt.verify(TOKEN, SECRET_KEY, (err, authData) => {
    if (err) {
      res.set("WWW-Authenticate", "Bearer realm='chat admin'");
      res.sendStatus(401);

      return;
    }

    logger.debug(logPrefix + "Authenticated");

    next();
  });
};
