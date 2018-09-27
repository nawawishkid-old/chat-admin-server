const { Router } = require("express");
const ctrl = require("../../controllers/user");
const withRequestBodyFilter = require("../../middlewares/withRequestBodyFilter");

const userRouter = Router();

const requestBodyFilter = withRequestBodyFilter.create(
  "username",
  "password",
  "email",
  "name"
);

userRouter.get("/:id", ctrl.get);

userRouter.post("/", ctrl.create);

userRouter.post("/update/:id", ctrl.update);
userRouter.put("/:id", ctrl.update);
userRouter.patch("/:id", requestBodyFilter, ctrl.update);

userRouter.post("/delete/:id", ctrl.delete);
userRouter.delete("/:id", ctrl.delete);

module.exports = userRouter;
