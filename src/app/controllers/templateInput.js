import TemplateInput from "../models/TemplateInput";

const ctrl = {};

// Get
ctrl.get = (req, res) => {
  console.log("templateInput.get()");
  console.log("params: ", req.params);

  const condition =
    typeof req.params.id !== "undefined" ? { id: req.params.id } : {};

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
  const { type, name, defaultValue, props } = req.body;
  // console.log("props: ", props);
  // const newProps = JSON.parse(props);
  // console.log("typeof newProps: ", typeof newProps);
  const template = new TemplateInput({
    type,
    name,
    defaultValue,
    props
  });

  template.save(err => {
    if (err) {
      console.error(err);
      res.status(402).json({
        msg: "Failed to create: ",
        err: err
      });
    }

    res.json({
      msg: "Created successfully"
    });
  });
};

// Update
ctrl.update = (req, res) => {
  const { type, name, defaultValue, props } = req.body;
  const newDoc = {
    type,
    name,
    defaultValue,
    props
  };

  TemplateInput.findByIdAndUpdate(req.params.id, newDoc, (err, doc) => {
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
  TemplateInput.findByIdAndRemove(req.params.id, (err, doc) => {
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
