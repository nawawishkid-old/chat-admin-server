import { getTokenFromHttpHeader } from "./utils";

export default (req, res, next) => {
  console.log("auth middleware");
  console.log("body: ", req.body);
  const token = getTokenFromHttpHeader(req.header("Authorization"));

  req.body.authToken = token || null;

  next();
};
