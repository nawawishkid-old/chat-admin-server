const passwordHash = require("password-hash");
const User = require("../../models/User");
const { signToken, handleUnauthenticated } = require("./common");

const isPasswordMatched = (res, givenPassword, fetchedPasswordHash) => {
  // console.log("isPasswordMatched()");
  const isAuth = passwordHash.verify(givenPassword, fetchedPasswordHash);

  if (!isAuth) {
    // Given username does exist but invalid password given.
    handleUnauthenticated(res, { msg: "Unauthenticated" });

    return false;
  }

  return true;
};

const getPasswordGrantTypeHandler = options => async (req, res) => {
  // console.log("passwordGrantType");
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(422).json({
      msg: "Required username and password"
    });

    return;
  }

  const { accessTokenLifespan, secret } = options;
  const handleThen = doc => {
    if (!doc) {
      // console.log("user not found");
      handleUnauthenticated(res, {
        msg: "Unauthenticated",
        err: new Error(`User does not exists.`).toString()
      });

      return;
    }

    if (!isPasswordMatched(res, password, doc.password)) {
      return;
    }

    signToken(res, doc._id, secret, accessTokenLifespan);
  };

  await User.findOne({ username })
    .select("+password")
    .then(handleThen)
    .catch(err => {
      handleUnauthenticated(res, { msg: "Unauthenticated", err });
    });
};

module.exports = getPasswordGrantTypeHandler;
