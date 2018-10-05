const db = require("../database");
const Template = require("../models/Template");
const templateParser = require("../modules/template-parser");

console.log('tp: ', templateParser);

// Get
exports.get = (req, res) => {
  db.connect();
  console.log("body: ", req.body);
  console.log("query: ", req.query);

  Template.findById(req.params.templateId, (err, doc) => {
    if (err) {
      res.status(404).json({
        msg: "Could not find template.",
        err: err
      });

      return;
    }

    console.log("doc: ", doc);

    const { content, closingTag, openTag } = doc;
    const newContent = templateParser(content, req.query, openTag, closingTag);

    console.log("newContent: ", newContent);

    res.status(200).json({
      msg: "Template parsed successfully.",
      data: newContent
    });
  });
  // Mocking
  // const content =
  //   "สวัสดี[[suffix]]คุณลูกค้า {{shopName}} ยินดีให้บริการ{{suffix}}");
  // const openTag = "{{";
  // const closingTag = "}}";
  // const userParams = {
  //   suffix: "ครับ",
  //   shopName: "HomeHuk"
  // };
  // const newContent = templateParser(content, userParams, openTag, closingTag);

  // console.log("newContent: ", newContent);

  // res.json({
  //   msg: "Parse successfully",
  //   data: newContent
  // });
  // Template.find(req.query.templateId, (err, doc) => {
  //   if (err) {
  //     res.status(402).json({
  //       msg: "No template found.",
  //       err: err
  //     });
  //     return;
  //   }

  //   const template = doc.content;
  //   // const templateParams = template.

  //   res.json({
  //     msg: "Parse successfully"
  //     // data: template
  //   });
  // });
};
