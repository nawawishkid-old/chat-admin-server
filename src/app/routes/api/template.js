import db from "~/src/app/modules/db";
import router from "../router";
import Template from "../../models/Template";
import authMiddleware from "../middlewares/auth";

db.connect();

// Get
router.get("/:id?", authMiddleware, (req, res) => {
  const condition =
    typeof req.params.id !== "undefined" ? { id: req.params.id } : {};

  Template.find(condition, (err, doc) => {
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
});

// Create
router.post("/new", authMiddleware, (req, res) => {
  const { name, content, symbol, inputs } = req.body;
  const template = new Template({
    name,
    content,
    symbol,
    inputs
  });

  template.save(err => {
    if (err) {
      console.error(err);
      res.sendStatus().json({
        msg: "Failed to create: ",
        err: err
      });
    }

    res.json({
      msg: "Created successfully"
    });
  });
});

// Update
router.post("/update/:id", authMiddleware, (req, res) => {
  const { name, symbol, content, inputs } = req.body;
  const newDoc = {
    name,
    symbol,
    content,
    inputs
  };

  Template.findByIdAndUpdate(req.params.id, newDoc, (err, doc) => {
    if (err) {
      res.sendStatus(400).json({
        msg: "Update failed",
        err: err
      });
      return;
    }

    res.json({
      msg: "Updated"
    });
  });
});

// Delete
router.post("/delete/:id", authMiddleware, (req, res) => {
  Template.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err) {
      res.sendStatus(400).json({
        msg: "Delete failed",
        err: err
      });
      return;
    }

    res.json({
      msg: "Deleted"
    });
  });
});

export default router;
