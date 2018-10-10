exports.create = (...key) => {
  return (req, res, next) => {
    const logger = require("../modules/loggers/middleware");
    const logName = "withRequestBodyFilter";
    const logPrefix = logName + " - ";

    logger.debug(logName);
    const bodyKeys = Object.keys(req.body);

    logger.debug(
      `${logPrefix}Request body required these properties: %s`,
      key.join(", ")
    );

    // Remove unrelated properties.
    bodyKeys.forEach(item => {
      if (key.indexOf(item) < 0) {
        logger.debug(`${logPrefix}- Remove '${item}' from request body.`);

        delete req.body[item];
      }
    });

    // Check required properties
    const isInvalid = key.some(item => bodyKeys.indexOf(item) < 0);

    if (isInvalid) {
      const msg = "Invalid argument";

      logger.debug(logPrefix + msg);

      res.status(422).json({
        msg
      });

      return;
    }

    logger.debug(`${logPrefix}Request body has been validated`);

    next();
  };
};
