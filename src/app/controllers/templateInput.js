const db = require("../database");
const TemplateInput = require("../models/TemplateInput");

// Get
exports.get = (req, res) => {
  db.connect();
  console.log("templateInput.get()");
  console.log("params: ", req.params);

  const condition =
    typeof req.params.id !== "undefined" ? { _id: req.params.id } : {};

  console.log("condition: ", condition);

  TemplateInput.find(condition, (err, doc) => {
    if (err) {
      res.status(404).json({
        msg: "No entry found."
      });
      return;
    }

    res.json({
      msg: `Found ${doc.length} document(s).`,
      data: { templateInput: doc.length > 1 ? doc : doc[0] }
    });
  });
};

// Create
exports.create = (req, res) => {
  db.connect();
  console.log("body: ", req.body);
  // const { name, label, options, componentScheme, accessToken } = req.body;
  // const doc = { name, label, options, componentScheme, creatorId: JSON.parse()}
  TemplateInput.create(req.body, err => {
    if (err) {
      console.log("--- on save error: ", err);
      res.status(422).json({
        msg: "Failed to create: ",
        err: err
      });
      return;
    }

    res.status(201).json({
      msg: "Created successfully"
    });
  });
};

// Update
exports.update = (req, res) => {
  db.connect();
  const { name, label, options, componentScheme } = req.body;
  const newDoc = { name, label, options, componentScheme };
  console.log("options: ", newDoc.componentScheme.options);
  console.log("newDoc: ", newDoc);
  // const { type, name, defaultValue, props } = req.body;
  // const newDoc = {
  //   type,
  //   name,
  //   defaultValue,
  //   props,
  // };

  TemplateInput.findByIdAndUpdate(req.params.id, newDoc, (err, doc) => {
    if (err) {
      res.status(422).json({
        msg: "Update failed",
        err: err
      });
      return;
    }

    console.log("Updated doc: ", doc);

    res.json({
      msg: "Updated",
      data: { templateInput: doc.length > 1 ? doc : doc[0] }
    });
  });
};

// Delete
exports.delete = (req, res) => {
  db.connect();
  TemplateInput.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      res.status(422).json({
        msg: "Delete failed",
        err: err
      });
      return;
    }

    res.json({
      msg: "Deleted"
    });
  });
};