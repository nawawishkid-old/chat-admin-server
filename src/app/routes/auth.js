import db from "~/src/app/modules/db";
import { Router } from "express";
import getAuthToken from "./middlewares/getAuthToken";
import jwt from "jsonwebtoken";
import {
  SECRET_KEY,
  ACCESS_TOKEN_LIFESPAN,
  REFRESH_TOKEN_LIFESPAN
} from "~/src/app/config";
import User from "../models/User";
import passwordHash from "password-hash";

db.connect();

const router = Router();

// Post
// tested
router.post("/token", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .select("+password")
    .exec((err, doc) => {
      console.log("err: ", err, "doc: ", doc);
      if (err) {
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
        {},
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

router.post("/refresh", getAuthToken, (req, res) => {
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
// router.post("/new", authMiddleware, ctrl.create);

// // Update
// router.post("/update/:id", authMiddleware, ctrl.update);

// // Delete
// router.post("/delete/:id", authMiddleware, ctrl.delete);

export default router;
