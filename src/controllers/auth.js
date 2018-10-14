const jwt = require("jsonwebtoken");
const User = require("../models/User");
const passwordHash = require("password-hash");

exports.getAccessToken = options => async (req, res) => {
  const { tokenLifespan, secret } = options;
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({
      msg: "Required username and password"
    });

    return;
  }

  const handleThen = doc => {
    if (!doc) {
      handleUnauthenticated(res, { msg: "Unauthenticated" });

      return;
    }

    if (!isPasswordMatched(res, password, doc.password)) {
      return;
    }

    signToken(res, doc._id, secret, tokenLifespan);
  };

  await User.findOne({ username })
    .select("+password")
    .catch(err => {
      handleUnauthenticated(res, { msg: "Unauthenticated", err });
    })
    .then(handleThen);
};

const handleUnauthenticated = (res, json) => {
  res.set("WWW-Authenticate", "Bearer realm='chat admin'");
  res.status(401).json(json);
};
const isPasswordMatched = (res, givenPassword, fetchedPasswordHash) => {
  const isAuth = passwordHash.verify(givenPassword, fetchedPasswordHash);

  if (!isAuth) {
    handleUnauthenticated(res, { msg: "Unauthenticated" });

    return false;
  }

  return true;
};
const signToken = (res, userId, secret, tokenLifespan) => {
  jwt.sign(
    { sub: userId },
    secret,
    { expiresIn: tokenLifespan },
    (err, token) => {
      if (err) {
        handleUnauthenticated(res, { msg: "JWT sign failed" });

        return;
      }

      res.json({ token, msg: "Access token issued successfully" });
    }
  );
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
