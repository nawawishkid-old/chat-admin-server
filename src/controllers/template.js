const Template = require("../models/Template");
const logger = require("../modules/loggers/controller");
const dbLogger = require("../modules/loggers/database");
const { end } = require("./utils");

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
      let status;
      const json = {};

      if (err) {
        status = 500;
        json.error = err;
      } else if (doc.length === 0) {
        status = 404;
      } else {
        status = 200;
        json.data = { templates: doc };
      }

      end(res, status, json);
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
    const { alreadyExists, createFailed } = require("./constants");
    let status, json;

    if (err) {
      json.error = err;

      if (err.code === 11000) {
        json.msg = alreadyExists.msg;
        status = alreadyExists.code;
      } else {
        json.msg = createFailed.msg;
        status = createFailed.code;
      }
    } else {
      status = 201;
    }

    end(res, status, json);
  });
};

/**
 * === Update ===
 */
exports.update = (req, res) => {
  logger.debug("Template.update()");

  req.body.updated_at = new Date();

  Template.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    const { updateFailed, updated } = require("./constants");
    const status = err ? updateFailed.code : updated.code;

    if (err) {
      res.status(status).json({ error: err });
    }

    res.sendStatus(status);
  });
};

/**
 * === DELETE ===
 */
exports.delete = (req, res) => {
  logger.debug("Template.delete()");

  Template.findByIdAndRemove(req.params.id, (err, doc) => {
    const status = err ? 422 : 204;

    if (err) {
      res.status(status).json({ error: err });
    }

    res.sendStatus(status);
  });
};
