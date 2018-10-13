/**
 * Attach user id from HTTP Authorization token to request object to be used in template and templateInput controller
 */
module.exports = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    res.set("WWW-Authenticate", "Bearer realm='chat admin'");
    res.status(401).json({
      msg: "Required JWT token"
    });

    return;
  }

  const decodedToken = jwt.decode(authHeader.split(" ")[1]);

  if (!decodedToken) {
    res.set("WWW-Authenticate", "Bearer realm='chat admin'");
    res.status(401).json({
      msg: "Invalid JWT token"
    });

    return;
  }

  const userId = decodedToken.sub;

  if (!userId) {
    res.set("WWW-Authenticate", "Bearer realm='chat admin'");
    res.status(401).json({
      msg: "Invalid JWT token"
    });

    return;
  }

  req.body.creatorId = userId;

  next();
};
