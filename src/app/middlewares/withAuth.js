const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { getTokenFromHttpHeader } = require("./utils");

module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE] auth");
  console.log("req.headers: ", req.headers);
  const token = getTokenFromHttpHeader(req.header("Authorization"));

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, authData) => {
    // console.log("authData: ", authData);
    if (err) {
      res.set(
        "WWW-Authenticate",
        "Bearer realm='This is description of protected resource.'"
      );
      res.status(401).json({
        msg: "Unauthenticated",
        err: err
      });
      return;
    }

    console.log("- Authenticated!");

    next();
  });
};
