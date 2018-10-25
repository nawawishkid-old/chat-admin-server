const { signToken, handleUnauthenticated } = require("./common");

const getRefreshGrantTypeHandler = options => (req, res) => {
  // console.log("refreshGrantType");
  res.status(500);

  const { refreshTimeout, secret, accessTokenLifespan } = options;
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(422).json({
      msg: "Required refresh token"
    });

    return;
  }

  if (typeof refreshToken !== "string") {
    res.status(401).json({
      msg: "Invalid refresh token"
    });

    return;
  }

  const jwtPayload = JSON.parse(
    Buffer.from(refreshToken.split(".")[1], "base64")
  );
  const nowInSeconds = Date.now() / 1000;
  const expirationTime = jwtPayload.exp;
  const totalTimeout = expirationTime + refreshTimeout;
  // seconds that passed expiration time
  const passedRefreshTimeout = nowInSeconds - totalTimeout;

  if (passedRefreshTimeout > 0) {
    res.status(401).json({
      msg: "Refresh token expired"
    });

    return;
  }

  const userId = jwtPayload.sub;

  signToken(res, userId, secret, accessTokenLifespan);
};

module.exports = getRefreshGrantTypeHandler;
