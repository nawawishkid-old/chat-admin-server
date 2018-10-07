const Template = require("../models/Template");

// Get
exports.get = (req, res) => {
  console.log("[CTRLLR]: template.get()");

  const condition = req.params.id !== undefined ? { _id: req.params.id } : {};

  condition.creatorId = req.body.creatorId;

  Template.find(condition)
    .populate("inputs")
    .exec((err, doc) => {
      console.log("EXECUTED.....................");
      if (err) {
        res.status(500).json({
          msg: "Database-related error occured.",
          err: err
        });

        return;
      }

      if (doc.length === 0) {
        res.status(404).json({
          msg: "No entry found."
        });

        return;
      }

      res.json({
        msg: `Found ${doc.length} document(s).`,
        data: { templates: doc }
      });
    });
};

// Create
exports.create = (req, res) => {
  console.log("[CTRLLR]: template.create()");

  // const { name, content, openTag, closingTag, inputs } = req.body;
  const template = new Template(req.body);

  template.save(err => {
    if (err) {
      console.error("err: ", err);
      res.status(422).json({
        msg: "Failed to create: ",
        err: err
      });
      return;
    }

    res.json({
      msg: "Created successfully"
    });
  });
};

// Update
exports.update = (req, res) => {
  console.log("[CTRLLR]: template.update()");

  const { name, content, openTag, closingTag, inputs, ...rest } = req.body;
  const newDoc = { name, content, openTag, closingTag, inputs };

  Template.findByIdAndUpdate(req.params.id, newDoc, (err, doc) => {
    if (err) {
      res.status(422).json({
        msg: "Update failed",
        err: err
      });
      return;
    }

    res.json({
      msg: "Updated"
    });
  });
};

// Delete
exports.delete = (req, res) => {
  console.log("[CTRLLR]: template.delete()");

  Template.findByIdAndRemove(req.params.id, (err, doc) => {
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
