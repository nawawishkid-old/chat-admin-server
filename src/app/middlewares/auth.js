import jwt from "jsonwebtoken";
import { SECRET_KEY } from "~/src/app/config";
import { getTokenFromHttpHeader } from "./utils";

export default (req, res, next) => {
  console.log("auth middleware");
  console.log("body: ", req.body);
  const token = getTokenFromHttpHeader(req.header("Authorization"));

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, SECRET_KEY, (err, authData) => {
    console.log("authData: ", authData);
    if (err) {
      res.set(
        "WWW-Authenticate",
        "Bearer realm='This is description of protected resource.'"
      );
      res.status(401).json({
        msg: "Unauthenticated",
        err: err
      });
      return;
    }

    console.log("authenticated!");

    next();
  });
};
