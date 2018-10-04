const jwt = require("jsonwebtoken");

/**
 * Attach user id from HTTP Authorization token to request object to be used in template and templateInput controller
 */
module.exports = (req, res, next) => {
  console.log("[MIDDLEWARE]: withCreatorId");
  const userId = jwt.decode(req.header("Authorization").split(" ")[1]).sub;

  if (typeof userId !== "string") {
    const errorMsg =
      "- Error: Expected userId to be a string, " + typeof userId + " given.";

    console.log(errorMsg);

    res.status(422).json({
      msg: errorMsg
    });

    return;
  }

  console.log("- Found userId: ", userId);

  req.body.creatorId = userId;

  // console.log("- req.body: ", req.body);
  console.log("- UserId has been attached to request body.");
  console.log("- next...");

  next();
};
