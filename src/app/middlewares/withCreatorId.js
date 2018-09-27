const jwt = require("jsonwebtoken");

/**
 * Attach user id from HTTP Authorization token to request object to be used in template and templateInput controller
 */
module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE]: withCreatorId");
  const userId = jwt.decode(req.header("Authorization").split(" ")[1]).sub;
  console.log("- userId: ", userId);
  req.body.creatorId = userId;
  console.log("- req.body: ", req.body);
  next();
};
