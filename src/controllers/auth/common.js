const jwt = require("jsonwebtoken");

exports.GRANT_TYPE_PASSWORD = "password";
exports.GRANT_TYPE_REFRESH = "refresh";

exports.handleUnauthenticated = (res, json) => {
  res.set("WWW-Authenticate", "Bearer realm='chat admin'");
  res.status(401).json(json);
};

exports.signToken = (res, userId, secret, accessTokenLifespan) => {
  // console.log("signToken()");
  const payload = { sub: userId };
  const options = { expiresIn: accessTokenLifespan };
  const accessToken = jwt.sign(payload, secret, options);

  if (!accessToken) {
    handleUnauthenticated(res, { msg: "JWT sign failed", err });
  } else {
    res
      .status(200)
      .json({ accessToken, msg: "Access token issued successfully" });
  }
};
