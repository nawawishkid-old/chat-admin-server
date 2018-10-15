const Template = require("../models/Template");
const { end } = require("./utils");

/**
 * === GET ===
 */
exports.get = (req, res) => {
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

  Template.create(newDoc, (err, doc) => {
    const { alreadyExists, createFailed } = require("./constants");
    let status;
    const json = {};

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
      json.data = { template: doc };
    }

    end(res, status, json);
  });
};

/**
 * === Update ===
 */
exports.update = (req, res) => {
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
  Template.findByIdAndRemove(req.params.id, (err, doc) => {
    const status = err ? 422 : 204;

    if (err) {
      res.status(status).json({ error: err });
    }

    res.sendStatus(status);
  });
};
