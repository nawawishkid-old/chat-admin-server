import db from "~/src/app/modules/db";
import TemplateInput from "../models/TemplateInput";

const ctrl = {};

// Get
ctrl.get = (req, res) => {
  db.connect();
  console.log("templateInput.get()");
  console.log("params: ", req.params);

  const condition =
    typeof req.params.id !== "undefined" ? { _id: req.params.id } : {};

  TemplateInput.find(condition, (err, doc) => {
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

  // TemplateInput.init()
  //   .then(() => {
  //     console.log("----- INIT!");
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });

  // TemplateInput.on("index", err => {
  //   console.log("----- INDEX!");
  //   // indexIsEnsured = true;

  //   if (err) {
  //     console.log("--- on index error: ", err);
  //     res.status(422).json({
  //       msg: "Failed to create: ",
  //       err: err
  //     });
  //     return;
  //   }

  //   console.log("----- CREATING...");

  //   TemplateInput.create(req.body, err => {
  //     if (err) {
  //       console.log("--- on save error: ", err);
  //       res.status(422).json({
  //         msg: "Failed to create: ",
  //         err: err
  //       });
  //       return;
  //     }

  //     res.json({
  //       msg: "Created successfully"
  //     });
  //   });
  // });

  console.log("----- NO ON INDEX...");

  // if (!indexIsEnsured) {
  //   console.log(">>> Index is unensured!");
  //   res.json({
  //     msg: "Index is unensured!"
  //   });
  //   return;
  // }

  // console.log(">>> Index is ensured!");

  // TemplateInput.create(req.body, err => {
  //   if (err) {
  //     console.log(">>> on save error2: ", err);
  //     res.status(422).json({
  //       msg: "Failed to create: ",
  //       err: err
  //     });
  //     return;
  //   }

  //   res.json({
  //     msg: "Created successfully"
  //   });
  // });
};

// Update
ctrl.update = (req, res) => {
  db.connect();
  const { type, name, defaultValue, props } = req.body;
  const newDoc = {
    type,
    name,
    defaultValue,
    props
  };

  TemplateInput.findByIdAndUpdate(req.params.id, newDoc, (err, doc) => {
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
ctrl.delete = (req, res) => {
  db.connect();
  TemplateInput.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      res.status(422).json({
        msg: "Delete failed",
        err: err
      });
      return;
    }

    res.status(410).json({
      msg: "Deleted"
    });
  });
};

export default ctrl;
