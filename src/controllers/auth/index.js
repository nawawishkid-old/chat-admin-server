const getPasswordGrantTypeHandler = require("./password-grant");
const getRefreshGrantTypeHandler = require("./refresh-grant");
const { GRANT_TYPE_REFRESH, GRANT_TYPE_PASSWORD } = require("./common");
/**
 * grant_type: password|refresh
 * refresh_token: <REFRESH_TOKEN>
 */
exports.getAccessToken = options => async (req, res) => {
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
