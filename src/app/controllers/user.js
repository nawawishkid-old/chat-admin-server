const db = require("../database");
const User = require("../models/User");

/**
 * Get user.
 *
 * @param {Object} req Express.js's Request object
 * @param {Object} res Express.js's Response object
 */
exports.get = (req, res) => {
  db.connect();
  if (req.params.id === undefined) {
    res.status(422).json({
      msg: "User's id is required but not given."
    });
    return;
  }

  User.findById(req.params.id, (err, doc) => {
    if (err || doc === null) {
      res.status(404).json({
        msg: "No entry found."
      });
      return;
    }

    res.json({
      msg: `Found.`,
      data: { user: doc }
    });
  });
};

/**
 * Create new user.
 *
 * @param {Object} req Express.js's Request object
 * @param {Object} res Express.js's Response object
 */
exports.create = (req, res) => {
  db.connect();
  const { username, name, email, password } = req.body;
  const user = new User({
    username,
    name,
    email,
    password
  });

  user.save(err => {
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

/**
 * Update user. Handle both PUT and PATCH HTTP methods
 *
 * @param {Object} req Express.js's Request object
 * @param {Object} res Express.js's Response object
 */
exports.update = (req, res) => {
  db.connect();
  User.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
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

/**
 * Delete user.
 *
 * @param {Object} req Express.js's Request object
 * @param {Object} res Express.js's Response object
 */
exports.delete = (req, res) => {
  db.connect();
  User.findByIdAndRemove(req.params.id, (err, obj) => {
    if (err || obj === null) {
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
