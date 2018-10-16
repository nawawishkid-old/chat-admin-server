const Template = require("../models/Template");
const parseTemplate = require("../modules/template-parser");

// Get
exports.get = async (req, res) => {
  const { templateId } = req.params;
  const { creatorId } = req.body;

  if (!templateId || !creatorId) {
    res.status(422).json({
      msg: "Parsing template required template ID and creator ID"
    });

    return;
  }

  await Template.findOne({
    _id: templateId,
    creatorId
  })
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "Template not found" });

        return;
      }

      const { content, closingTag, openTag } = doc;
      const result = parseTemplate(content, req.query, openTag, closingTag);

      if (result.isComplete) {
        res.status(200).json({
          msg: "Template parsed",
          data: { parsedContent: result.content }
        });
      } else {
        res.status(422).json({
          msg: "Parsed template is incomplete",
          data: { required: result.mismatched }
        });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Could not parse template", err });
    });
};
