const User = require("../models/User");

/**
 * === GET ===
 */
exports.get = async (req, res) => {
  res.status(500);

  if (req.params.id === undefined) {
    res.status(422).json({ msg: "User's id is required but not given" });

    return;
  }

  await User.findById(req.params.id)
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.status(200).json({ msg: "User found", data: { user: doc } });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to get user", err });
    });
};

/**
 * === Create ===
 */
exports.create = async (req, res) => {
  res.status(500);

  await User.create(req.body)
    .then(doc => {
      res.status(201).json({ msg: "User created", data: { user: doc } });
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to create user", err });
    });
};
/**
 * === Update ===
 */
exports.update = async (req, res) => {
  res.status(500);
  req.body.updated_at = new Date();

  const condition = {
    _id: req.params.id,
    creatorId: req.body.creatorId
  };

  delete req.body.creatorId;

  /**
   * Must find by userId and creatorId.
   * req.body.creatorId MUST be created only by the middleware.
   *
   * or
   *
   * accept access token instead of creatorId
   * and then authenticate in the controller
   *
   * and
   *
   * don't forget to remove creatorId from req.body
   * before updating user
   * because you will accidentally change the owner of the user
   */
  await User.findOneAndUpdate(condition, req.body, { new: true })
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.status(200).json({ msg: "User updated", data: { user: doc } });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to update user", err });
    });
};

/**
 * === DELETE ===
 */
exports.delete = async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
    .then(doc => {
      if (doc === null) {
        res.status(404).json({ msg: "User not found" });
      } else {
        res.status(200).json({ msg: "User deleted", data: { user: doc } });
      }
    })
    .catch(err => {
      res.status(422).json({ msg: "Failed to delete user", err });
    });
};
