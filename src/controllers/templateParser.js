const Template = require("../models/Template");
const templateParser = require("../modules/template-parser");
const logger = require("../modules/loggers/controller");
const logName = "templateParser";
const logPrefix = logName + " - ";

// Get
exports.get = (req, res) => {
  logger.debug(logPrefix + "get()");

  Template.findById(req.params.templateId, (err, doc) => {
    let msg, status, data;

    if (err) {
      msg = "Could not find template.";
      status = 404;
    } else {
      const { content, closingTag, openTag } = doc;
      const newContent = templateParser(
        content,
        req.query,
        openTag,
        closingTag
      );

      msg = "Template parsed successfully.";
      status = 200;
      data = newContent;
      
			logger.debug(logPrefix + "parsed content: %s", newContent);
    }

    res.status(status).json({
      msg,
      data
    });
  });
};
