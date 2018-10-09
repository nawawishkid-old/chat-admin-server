const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { getTokenFromHttpHeader } = require("./utils");

module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE] auth");

  const token = getTokenFromHttpHeader(req.header("Authorization"));

  if (!token) {
    const errMsg =
      "Error: Expected access token from Authorization header to be a string, but got " +
      typeof token;

    console.log("- " + errMsg);

    res.status(403).json({
      msg: errMsg
    });

    return;
  }

  console.log("- Verifying JWT...");

  jwt.verify(token, SECRET_KEY, (err, authData) => {
    if (err) {
      const errMsg = "Unauthenticated";

      console.log("- " + errMsg);

      res.set(
        "WWW-Authenticate",
        "Bearer realm='This is description of protected resource.'"
      );
      res.status(401).json({
        msg: errMsg,
        err: err
      });

      return;
    }

    console.log("- Authenticated");
		console.log("- next...");

    next();
  });
};
