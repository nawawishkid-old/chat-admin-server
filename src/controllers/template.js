const Template = require("../models/Template");
const logger = require("../modules/loggers/controller");
const dbLogger = require("../modules/loggers/database");

/**
 * === GET ===
 */
exports.get = (req, res) => {
  logger.debug("Template.get()");

  const condition = req.params.id !== undefined ? { _id: req.params.id } : {};

  condition.creatorId = req.body.creatorId;

  Template.find(condition)
    .populate("inputs")
    .exec((err, doc) => {
      let msg, status, data;

      if (err) {
        msg = "Database-related error occurred.";
        status = 500;
      } else if (doc.length === 0) {
        msg = "No entry found.";
        status = 404;
      } else {
        msg = `Found ${doc.length} document(s).`;
        status = 200;
        data = { templates: doc };
      }

      dbLogger.debug(msg);

      res.status(status).json({
        msg,
        data,
        err
      });
    });
};

/**
 * === Create ===
 */
exports.create = (req, res) => {
  logger.debug("Template.create()");

  const {
    name,
    content,
    openTag,
    closingTag,
    inputs,
    creatorId,
    ...rest
  } = req.body;
  const newDoc = { name, content, openTag, closingTag, inputs, creatorId };

  const template = new Template(newDoc);

  template.save(err => {
    let msg, status;

    if (err) {
      status = 422;

      if (err.code === 11000) {
        msg = `Template name '${req.body.name}' already exists.`;
      } else {
        msg = "Failed to create template.";
      }
    } else {
      msg = "Created successfully";
      status = 200;
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
  logger.debug("Template.update()");

  const {
    name,
    content,
    openTag,
    closingTag,
    inputs,
    creatorId,
    ...rest
  } = req.body;
  const newDoc = { name, content, openTag, closingTag, inputs, creatorId };

  Template.findByIdAndUpdate(req.params.id, newDoc, (err, doc) => {
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
  logger.debug("Template.delete()");

  Template.findByIdAndRemove(req.params.id, (err, doc) => {
    const msg = err ? "Delete failed" : "Deleted";
    const status = err ? 422 : 200;

    dbLogger.debug(msg);

    res.status(status).json({
      msg,
      err
    });
  });
};
