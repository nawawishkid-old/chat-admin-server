import jwt from "jsonwebtoken";
import { SECRET_KEY } from "~/src/app/config";

export default {
  method: "post",
  path: "/token",
  handler: (req, res) => {
    const { username, password } = req.body;
    // Mock user
    const user = {
      id: 1,
      username: "demo",
      email: "demo@demo.com"
    };

    if (username !== "demo" || password !== "demo") {
      res.sendStatus(401);
    }

    jwt.sign(user, SECRET_KEY, (err, token) => {
      res.json({ token, msg: "Authenticated" });
    });
  }
};
