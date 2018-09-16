import db from "~/src/app/database";
import Template from "../models/Template";

const ctrl = {};

// Get
ctrl.get = (req, res) => {
  db.connect();
  const condition = req.params.id !== undefined ? { _id: req.params.id } : {};

  Template.find(condition)
    .populate("inputs")
    .exec((err, doc) => {
      if (err) {
        res.json({
          msg: "No entry found."
        });
        return;
      }

      res.json({
        msg: `Found ${doc.length} document(s).`,
        doc: doc
      });
    });
};

// Create
ctrl.create = (req, res) => {
  db.connect();
  // const { name, content, openTag, closingTag, inputs } = req.body;
  const template = new Template(req.body);

  template.save(err => {
    if (err) {
      console.error("err: ", err);
      res.status(402).json({
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
ctrl.update = (req, res) => {
  db.connect();
  const { name, symbol, content, inputs } = req.body;
  const newDoc = {
    name,
    symbol,
    content,
    inputs
  };

  Template.findByIdAndUpdate(req.params.id, newDoc, (err, doc) => {
    if (err) {
      res.status(402).json({
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
ctrl.delete = (req, res) => {
  db.connect();
  Template.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      res.status(402).json({
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

export default ctrl;
