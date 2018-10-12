const app = require("../init");
const jwt = require("jsonwebtoken");
const SECRET_KEY = app.get("secret");
const ACCESS_TOKEN_LIFESPAN = app.get("access token lifespan");
const REFRESH_TOKEN_LIFESPAN = app.get("refresh token lifespan");
const User = require("../models/User");
const passwordHash = require("password-hash");
const logger = require("../modules/loggers/controller");
const dbLogger = require("../modules/loggers/database");
const logName = "Auth";
const logPrefix = logName + " - ";

exports.get = (req, res) => {
  logger.debug(logPrefix + "get()");

  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({
      msg: "Required username and password"
    });

    return;
  }

  User.findOne({ username })
    .select("+password")
    .exec((err, doc) => {
      if (err || doc === null) {
        dbLogger.warn("User not found");

        res.set("WWW-Authenticate", "Bearer realm='chat admin'");
				res.status(401).json({
          msg: "Unauthenticated",
          err
        });

        return;
      }

      const hashedPassword = doc.password;
      const isAuth = passwordHash.verify(password, hashedPassword);

      if (!isAuth) {
        logger.warn(logPrefix + "Password mismatch.");
	
				res.set("WWW-Authenticate", "Bearer realm='chat admin'");
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
            logger.warn(logPrefix + "Invalid JWT token.");

						res.set("WWW-Authenticate", "Bearer realm='chat admin'");
            res.status(401).json({
              msg: "JWT sign failed",
              err
            });

            return;
          }

          logger.debug(logPrefix + "Authenticated");

          res.json({ token, msg: "Authenticated" });
        }
      );
    });
};

// exports.refresh = (req, res) => {
//   db.connect();
//   const oldToken = req.body.authToken;
//   console.log("oldToken: ", oldToken);
//
//   if (typeof oldToken !== "string") {
//     res.sendStatus(403);
//     return;
//   }
//
//   // console.log("oldToken: ", oldToken.split("."));
//   const payload = JSON.parse(Buffer.from(oldToken.split(".")[1], "base64"));
//   // in seconds
//   const expiredAge = Math.floor(Date.now() / 1000) - payload.exp;
//
//   console.log("payload: ", payload);
//
//   if (expiredAge > REFRESH_TOKEN_LIFESPAN) {
//     res.status(403).json({
//       msg: "Refresh timeout"
//     });
//     return;
//   }
//
//   jwt.sign(
//     {},
//     SECRET_KEY,
//     { expiresIn: ACCESS_TOKEN_LIFESPAN },
//     (err, token) => {
//       console.log("token: ", token);
//       if (err) {
//         res.status(200).json({
//           msg: "JWT sign failed",
//           err: err
//         });
//         return;
//       }
//
//       res.json({ token, msg: "Authenticated" });
//     }
//   );
// };
