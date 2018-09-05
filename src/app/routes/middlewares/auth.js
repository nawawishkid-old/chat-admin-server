import jwt from "jsonwebtoken";
import { SECRET_KEY } from "~/src/app/config";

export default (req, res, next) => {
  console.log("auth middleware");
  const token = req.query.accessToken;

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(req.query.accessToken, SECRET_KEY, (err, authData) => {
    if (err) {
      res.sendStatus(401).json({
        msg: "Unauthorized"
      });
      return;
    }

    console.log("authenticated!");

    next();
  });
};
