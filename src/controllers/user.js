const User = require("../models/User");
const logger = require("../modules/loggers/controller");
const dbLogger = require("../modules/loggers/database");
const logName = "User";
const logPrefix = logName + " - ";

/**
 * === GET ===
 */
exports.get = (req, res) => {
  logger.debug(logPrefix + "get()");

  let msg, status, data;

  if (req.params.id === undefined) {
    msg = "User's id is required but not given.";
    status = 422;

    logger.warn(msg);

    res.status(status).json({ msg });

    return;
  }

  User.findById(req.params.id, (err, doc) => {
    if (err || doc === null) {
      msg = "No entry found.";
      status = 404;
    } else {
      msg = "Found";
      status = 200;
      data = { user: doc };
    }

    dbLogger.debug(msg);

    res.status(status).json({ msg, data });
  });
};

/**
 * === Create ===
 */
exports.create = (req, res) => {
  logger.debug(logPrefix + "create()");

  const { username, name, email, password } = req.body;
  const user = new User({
    username,
    name,
    email,
    password
  });

  user.save(err => {
    let msg, status;

    if (err) {
      status = 422;

      if (err.code === 11000) {
        msg = `Username '${req.body.name}' already exists.`;
      } else {
        msg = "Failed to create user.";
      }
    } else {
      msg = "Created successfully";
      status = 201;
    }

    dbLogger.debug(msg);

    res.status(status).json({
      msg,
      err
    });
  });
};

/**
 * === Update ===
 */
exports.update = (req, res) => {
  logger.debug(logPrefix + "update()");

  req.body.updated_at = new Date();

  User.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    const msg = err ? "Update failed" : "Updated";
    const status = err ? 422 : 200;

    dbLogger.debug(msg);

    res.status(status).json({
      msg,
      err
    });
  });
};

/**
 * === DELETE ===
 */
exports.delete = (req, res) => {
  logger.debug(logPrefix + "delete()");

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    const msg = err || !doc ? "Delete failed" : "Deleted";
    const status = err || !doc ? 422 : 200;

    dbLogger.debug(msg);

    res.status(status).json({
      msg,
      err
    });
  });
};
