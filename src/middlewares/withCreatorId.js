/**
 * Attach user id from HTTP Authorization token to request object to be used in template and templateInput controller
 */
module.exports = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const logger = require("../modules/loggers/middleware");
  const logName = "withCreatorId";
  const logPrefix = logName + " - ";

  logger.verbose(logName);

  const userId = jwt.decode(req.header("Authorization").split(" ")[1]).sub;

  if (typeof userId !== "string") {
    const errorMsg =
      "- Error: Expected userId to be a string, " + typeof userId + " given.";

    logger.debug(logPrefix + errorMsg);

    res.status(422).json({
      msg: errorMsg
    });

    return;
  }

  logger.debug(`${logPrefix}Found userId: %s`, userId);

  req.body.creatorId = userId;

  logger.debug(`${logPrefix}UserId has been attached to request body.`);

  next();
};
