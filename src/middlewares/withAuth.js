module.exports = ({ secret }) => (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const { getTokenFromHttpHeader } = require("./utils");
  const TOKEN = getTokenFromHttpHeader(req.header("Authorization"));

  if (!TOKEN) {
    res.set("WWW-Authenticate", "Bearer realm='chat admin'");
    res.status(401).json({
      msg: "Required JWT token"
    });

    return;
  }

  jwt.verify(TOKEN, secret, (err, authData) => {
    if (err) {
      res.set("WWW-Authenticate", "Bearer realm='chat admin'");
      res.status(401).json({
        msg: "Invalid JWT token"
      });

      return;
    }

    next();
  });
};
