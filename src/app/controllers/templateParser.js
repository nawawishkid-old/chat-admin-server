import Template from "../models/Template";

const ctrl = {};

// Get
ctrl.get = (req, res) => {
  Template.find(req.query.templateId, (err, doc) => {
    if (err) {
      res.status(402).json({
        msg: "No template found.",
        err: err
      });
      return;
    }

    const template = doc.content;
    // const templateParams = template.

    res.json({
      msg: "Parse successfully"
      // data: template
    });
  });
};

export default ctrl;
