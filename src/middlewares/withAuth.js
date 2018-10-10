module.exports = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const { SECRET_KEY } = require("../configs").app;
  const { getTokenFromHttpHeader } = require("./utils");
  const logger = require("../modules/loggers/middleware");
  const logName = "withAuth";
  const logPrefix = logName + " - ";
  const token = getTokenFromHttpHeader(req.header("Authorization"));

  logger.debug(logName);

  if (!token) {
    const errMsg = "Unauthenticated";

    logger.debug(logPrefix + errMsg);

    res.status(401).json({
      msg: errMsg
    });

    return;
  }

  jwt.verify(token, SECRET_KEY, (err, authData) => {
    if (err) {
      const errMsg = "Unauthenticated";

      logger.debug(logPrefix + errMsg);

      res.set(
        "WWW-Authenticate",
        "Bearer realm='This is description of protected resource.'"
      );
      res.status(401).json({
        msg: errMsg,
        err
      });

      return;
    }

    logger.debug(logPrefix + "Authenticated");

    next();
  });
};
