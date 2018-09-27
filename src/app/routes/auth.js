const db = require("../database");
const { Router } = require("express");
const getAuthToken = require("../middlewares/getAuthToken");
const jwt = require("jsonwebtoken");
const {
  SECRET_KEY,
  ACCESS_TOKEN_LIFESPAN,
  REFRESH_TOKEN_LIFESPAN
} = require("../config");
const User = require("../models/User");
const passwordHash = require("password-hash");

const authRouter = Router();

// Post
// tested
authRouter.post("/token", (req, res) => {
  console.log("DB: ", db);

  db.connect();
  console.log("body: ", req.body);
  const { username, password } = req.body;

  User.findOne({ username })
    .select("+password")
    .exec((err, doc) => {
      console.log("err: ", err, "doc: ", doc);
      if (err || doc === null) {
        res.status(204).json({
          msg: "Unauthenticated",
          err: err
        });
        return;
      }

      const hashedPassword = doc.password;
      const isAuth = passwordHash.verify(password, hashedPassword);

      if (!isAuth) {
        res.status(401).json({
          msg: "Unauthenticated"
        });
        return;
      }

      jwt.sign(
        { sub: doc._id },
        SECRET_KEY,
        { expiresIn: ACCESS_TOKEN_LIFESPAN },
        (err, token) => {
          if (err) {
            res.status(401).json({
              msg: "JWT sign failed",
              err: err.message
            });
            return;
          }

          res.json({ token, msg: "Authenticated" });
        }
      );
    });
});

authRouter.post("/refresh", getAuthToken, (req, res) => {
  db.connect();
  const oldToken = req.body.authToken;
  console.log("oldToken: ", oldToken);

  if (typeof oldToken !== "string") {
    res.sendStatus(403);
    return;
  }

  // console.log("oldToken: ", oldToken.split("."));
  const payload = JSON.parse(Buffer.from(oldToken.split(".")[1], "base64"));
  // in seconds
  const expiredAge = Math.floor(Date.now() / 1000) - payload.exp;

  console.log("payload: ", payload);

  if (expiredAge > REFRESH_TOKEN_LIFESPAN) {
    res.status(403).json({
      msg: "Refresh timeout"
    });
    return;
  }

  jwt.sign(
    {},
    SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_LIFESPAN },
    (err, token) => {
      console.log("token: ", token);
      if (err) {
        res.status(200).json({
          msg: "JWT sign failed",
          err: err
        });
        return;
      }

      res.json({ token, msg: "Authenticated" });
    }
  );
});

// Create
// authRouter.post("/new", authMiddleware, ctrl.create);

// // Update
// authRouter.post("/update/:id", authMiddleware, ctrl.update);

// // Delete
// authRouter.post("/delete/:id", authMiddleware, ctrl.delete);

module.exports = authRouter;
