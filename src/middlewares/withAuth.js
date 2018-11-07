/**
 * Token should be invalid if:
 *   1) User has logged out.
 *   2) User account has been removed
 *
 * Current token validation mechanism validates (checks) token using only its expiration time.
 * No revocation mechanism has been implemented.
 *
 * You have to implement the requirements above for security reasons.
 */
module.exports = ({ secret }) => async (req, res, next) => {
  const app = require("../init");
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

  let jwtPayload;

  try {
    jwtPayload = jwt.verify(TOKEN, secret);
  } catch (e) {
    res.set("WWW-Authenticate", "Bearer realm='chat admin'");
    res.status(401).json({
      msg: "Invalid JWT token"
    });

    return;
  }

  /**
   * 2) Check verified token if it is revoked. (connect to Redis DB)
   */
  const redis = require("redis").createClient({
    host: app.get("redis host"),
    port: app.get("redis port")
  });
  const { promisify } = require("util");
  const getAsync = promisify(redis.get).bind(redis);

  await getAsync(TOKEN)
    .then(result => {
      if (result) {
        res.set("WWW-Authenticate", "Bearer realm='chat admin'");
        res.status(401).json({
          msg: "Access token was revoked"
        });
      } else {
        next();
      }
    })
    .catch(err => {
      res.set("WWW-Authenticate", "Bearer realm='chat admin'");
      res.status(422).json({
        msg: "Redis error",
        err: err.toString()
      });
    });

  redis.quit();
};
