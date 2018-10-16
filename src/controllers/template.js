const Template = require("../models/Template");
const { end } = require("./utils");

const getThen = res => doc => {
  if (doc === null || doc.length === 0) {
    res.status(404).json({ msg: "Template not found" });

    return doc;
  }

  const data = {};

  if (Array.isArray(doc)) {
    data.templates = doc;
  } else {
    data.template = doc;
  }

  res.status(200).json({ msg: "Template found", data });
};

const getCatch = res => err => {
  res.status(422).json({ msg: "Failed to get template", err });
};

/**
 * === GET ===
 */
exports.get = async (req, res) => {
  res.status(500);

  const { creatorId } = req.body;
  const query = req.params.id
    ? Template.findOne({ _id: req.params.id, creatorId })
    : Template.find({ creatorId });

  await query
    .exec()
    .then(getThen(res))
    .catch(getCatch(res));
};

/**
 * === Create ===
 */
exports.create = async (req, res) => {
  res.status(500);

  await Template.create(req.body)
    .then(doc => {
      res
        .status(201)
        .json({ msg: "Template created", data: { template: doc } });
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to create template", err });
    });
};

/**
 * === Update ===
 */
exports.update = async (req, res) => {
  res.status(500);
  req.body.updated_at = new Date();

  const condition = {
    _id: req.params.id,
    creatorId: req.body.creatorId
  };

  delete req.body.creatorId;

  /**
   * Must find by templateId and creatorId.
   * req.body.creatorId MUST be created only by the middleware.
   *
   * or
   *
   * accept access token instead of creatorId
   * and then authenticate in the controller
   *
   * and
   *
   * don't forget to remove creatorId from req.body
   * before updating template
   * because you will accidentally change the owner of the template
   */
  await Template.findOneAndUpdate(condition, req.body, { new: true })
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "Template not found" });
      } else {
        res
          .status(200)
          .json({ msg: "Template updated", data: { template: doc } });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to update template", err });
    });
};

/**
 * === DELETE ===
 */
exports.delete = async (req, res) => {
  await Template.findByIdAndRemove(req.params.id)
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "Template not found" });
      } else {
        res
          .status(200)
          .json({ msg: "Template deleted", data: { template: doc } });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to delete template", err });
    });
};
