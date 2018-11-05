const getPasswordGrantTypeHandler = require("./password-grant");
const getRefreshGrantTypeHandler = require("./refresh-grant");
const { GRANT_TYPE_REFRESH, GRANT_TYPE_PASSWORD } = require("./common");
/**
 * grant_type: password|refresh
 * refresh_token: <REFRESH_TOKEN>
 */
exports.getAccessToken = options => async (req, res) => {
  // console.log('getAccessToken()')
  res.status(500);

  const { grantType } = req.body;

  if (!grantType) {
    res.status(422).json({
      msg: "Required grant type"
    });

    return;
  }

  if (grantType === GRANT_TYPE_PASSWORD) {
    await getPasswordGrantTypeHandler(options)(req, res);
  } else if (grantType === GRANT_TYPE_REFRESH) {
    getRefreshGrantTypeHandler(options)(req, res);
  } else {
    res.status(422).json({
      msg: "Invalid grant type",
      expected: [GRANT_TYPE_PASSWORD, GRANT_TYPE_REFRESH]
    });
  }
};

exports.getRevocationController = options => async (req, res) => {
  res.status(500);

  const { accessToken } = req.body;

  if (!accessToken) {
    res.status(422).json({
      msg: "Required access token"
    });

    return;
  }

  const { secret } = options;
  let jwtPayload;

  try {
    jwtPayload = require("jsonwebtoken").verify(accessToken, secret);
  } catch (e) {
    res.status(401).json({
      msg: "Invalid access token"
    });

    return;
  }

  // Redis expiration time could not be decimal
  const expiration = Math.ceil(jwtPayload.exp - Date.now() / 1000);
  const redis = require("redis").createClient();
  const { promisify } = require("util");
  const setAsync = promisify(redis.set).bind(redis);

  await setAsync(accessToken, 1, "EX", expiration)
    .then(result => {
      res.status(200).json({
        msg: "Access token revoked successfully"
      });
    })
    .catch(err => {
      res.status(422).json({
        msg: "Failed to revoke access token",
        err
      });
    });
  redis.quit();
};
