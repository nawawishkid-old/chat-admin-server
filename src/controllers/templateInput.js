const TemplateInput = require("../models/TemplateInput");

const getThen = res => doc => {
  if (doc === null || doc.length === 0) {
    res.status(404).json({ msg: "TemplateInput not found" });

    return doc;
  }

  const data = {};

  if (Array.isArray(doc)) {
    data.templateInputs = doc;
  } else {
    data.templateInput = doc;
  }

  res.status(200).json({ msg: "TemplateInput found", data });
};

const getCatch = res => err => {
  res.status(422).json({ msg: "Failed to get templateInput", err });
};

/**
 * === GET ===
 */
exports.get = async (req, res) => {
  res.status(500);

  const { creatorId } = req.body;
  const query = req.params.id
    ? TemplateInput.findOne({ _id: req.params.id, creatorId })
    : TemplateInput.find({ creatorId });

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

  await TemplateInput.create(req.body)
    .then(doc => {
      res
        .status(201)
        .json({ msg: "TemplateInput created", data: { templateInput: doc } });
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to create templateInput", err });
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
   * Must find by templateInputId and creatorId.
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
   * before updating templateInput
   * because you will accidentally change the owner of the templateInput
   */
  await TemplateInput.findOneAndUpdate(condition, req.body, { new: true })
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "TemplateInput not found" });
      } else {
        res
          .status(200)
          .json({ msg: "TemplateInput updated", data: { templateInput: doc } });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to update templateInput", err });
    });
};

/**
 * === DELETE ===
 */
exports.delete = async (req, res) => {
  await TemplateInput.findByIdAndRemove(req.params.id)
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "TemplateInput not found" });
      } else {
        res
          .status(200)
          .json({ msg: "TemplateInput deleted", data: { templateInput: doc } });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to delete templateInput", err });
    });
};
