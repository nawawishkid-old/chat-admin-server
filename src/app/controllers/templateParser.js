import Template from "../models/Template";
import templateParser from "~/src/app/modules/template-parser/index";

const ctrl = {};

// Get
ctrl.get = (req, res) => {
  // Mocking
  const content =
    "สวัสดี[[suffix]]คุณลูกค้า {{shopName}} ยินดีให้บริการ{{suffix}}";
  const openTag = "{{";
  const closingTag = "}}";
  const userParams = {
    suffix: "ครับ",
    shopName: "HomeHuk"
  };
  const newContent = templateParser(content, userParams, openTag, closingTag);

  console.log("newContent: ", newContent);

  res.json({
    msg: "Parse successfully",
    data: newContent
  });
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

export default ctrl;
