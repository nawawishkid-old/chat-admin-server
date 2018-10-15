const Template = require("../models/Template");
const { end } = require("./utils");

const getThen = res => doc => {
  if (doc.length === 0) {
    res.status(404).json({ msg: "Template not found" });

    return doc;
  }

  res.status(200).json({ msg: "Template found", data: { templates: doc } });
};

const getCatch = res => err => {
  res.status(422).json({ msg: "Database-related error", err });
};

/**
 * === GET ===
 */
exports.get = async (req, res) => {
  res.status(500);

  const condition = req.params.id !== undefined ? { _id: req.params.id } : {};

  /**
   * *** Should separate .find() and .findOne() based on req.params.id
   */
  await Template.find(condition)
    .exec()
    .catch(getCatch(res))
    .then(getThen(res));
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
