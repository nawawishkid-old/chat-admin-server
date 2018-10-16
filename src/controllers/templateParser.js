const Template = require("../models/Template");
const templateParser = require("../modules/template-parser");

// Get
exports.get = async (req, res) => {
  await Template.findOne({
    _id: req.params.templateId,
    creatorId: req.body.creatorId
  })
    .then(doc => {
      const { content, closingTag, openTag } = doc;
      const newContent = templateParser(
        content,
        req.query,
        openTag,
        closingTag
      );

      res
        .status(200)
        .json({
          msg: "Template parsed",
          data: { parsedContent: newContent }
        });
    })
    .catch(err => {
      res.status(404).json({ msg: "Template not found" });
    });
};
