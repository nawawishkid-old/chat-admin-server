const TemplateInput = require("../models/TemplateInput");
const logger = require("../modules/loggers/controller");
const dbLogger = require("../modules/loggers/database");

/**
 * === GET ===
 */
exports.get = (req, res) => {
  logger.debug("TemplateInput.get()");

  const condition =
    typeof req.params.id !== "undefined" ? { _id: req.params.id } : {};

  condition.creatorId = req.body.creatorId;

  TemplateInput.find(condition, (err, doc) => {
    let msg, status, data;

    if (err) {
      msg = "Database-related error occurred.";
      status = 500;
    } else if (doc.length === 0) {
      msg = "Template input not found.";
      status = 404;
    } else {
      msg = `Found ${doc.length} document(s).`;
      status = 200;
      data = { templateInputs: doc };
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
  logger.debug("TemplateInput.create()");

  TemplateInput.create(req.body, err => {
    let msg, status;

    if (err) {
      status = 422;

      if (err.code === 11000) {
        msg = `Template input name '${req.body.name}' already exists.`;
      } else {
        msg = "Failed to create template input.";
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
  logger.debug("TemplateInput.update()");

  // const { name, label, options, componentScheme } = req.body;
  // const newDoc = { name, label, options, componentScheme };

  TemplateInput.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
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
  logger.debug("TemplateInput.delete()");

  TemplateInput.findByIdAndRemove(req.params.id, (err, doc) => {
    const msg = err ? "Delete failed" : "Deleted";
    const status = err ? 422 : 200;

    dbLogger.debug(msg);

    res.status(status).json({
      msg,
      err
    });
  });
};
