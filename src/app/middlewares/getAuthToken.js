const { getTokenFromHttpHeader } = require("./utils");

module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE]: attachAuthToken");
  const token = getTokenFromHttpHeader(req.header("Authorization"));

  req.body.authToken = token || null;

  next();
};
