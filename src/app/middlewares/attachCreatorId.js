import jwt from "jsonwebtoken";

/**
 * Attach user id from HTTP Authorization token to request object to be used in template and templateInput controller
 */
const attachCreatorId = (req, res, next) => {
  const userId = jwt.decode(req.header("Authorization").split(" ")[1]).sub;
  console.log("userId: ", userId);
  req.body.creatorId = userId;
  next();
};

export default attachCreatorId;
