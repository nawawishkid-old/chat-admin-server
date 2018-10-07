const TemplateInput = require("../models/TemplateInput");

// Get
exports.get = (req, res) => {
  console.log("[CTRLLR]: templateInput.get()");

  const condition =
    typeof req.params.id !== "undefined" ? { _id: req.params.id } : {};

  condition.creatorId = req.body.creatorId;

  TemplateInput.find(condition, (err, doc) => {
    if (err) {
      res.status(500).json({
        msg: "Database-related error occured.",
        err: err
      });
      return;
    }

    if (doc.length === 0) {
      res.status(404).json({
        msg: "TemplateInput not found."
      });

      return;
    }

    res.json({
      msg: `Found ${doc.length} document(s).`,
      data: { templateInputs: doc }
    });
  });
};

// Create
exports.create = (req, res) => {
  console.log("[CTRLLR]: templateInput.create()");

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
  console.log("[CTRLLR]: templateInput.update()");

  const { name, label, options, componentScheme } = req.body;
  const newDoc = { name, label, options, componentScheme };
  console.log("options: ", newDoc.componentScheme.options);
  console.log("newDoc: ", newDoc);

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
  console.log("[CTRLLR]: templateInput.delete()");

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
