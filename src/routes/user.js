const { Router } = require("express");
const ctrl = require("../controllers/user");
const { withRequestBodyFilter, connectDB } = require("../middlewares");
const { withAuth } = require("./middlewares");

const userRouter = Router();

const requestBodyFilter = withRequestBodyFilter.create(
  "username",
  "password",
  "email",
  "name"
);

const middlewares1 = [withAuth, connectDB];
const middlewares2 = [withAuth, requestBodyFilter, connectDB];

userRouter.get("/:id", ...middlewares1, ctrl.get);

userRouter.post("/", requestBodyFilter, connectDB, ctrl.create);

userRouter.post("/update/:id", ...middlewares1, ctrl.update);
userRouter.put("/:id", ...middlewares1, ctrl.update);
userRouter.patch("/:id", ...middlewares1, requestBodyFilter, ctrl.update);

userRouter.post("/delete/:id", ...middlewares1, ctrl.delete);
userRouter.delete("/:id", ...middlewares1, ctrl.delete);

module.exports = userRouter;
