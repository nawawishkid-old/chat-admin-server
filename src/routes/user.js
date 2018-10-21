const { Router } = require("express");
const ctrl = require("../controllers/user");
const { withRequestBodyFilter, connectDB } = require("../middlewares");
const { withAuth } = require("./middlewares");

const userRouter = Router();

const requestBodyFilter = withRequestBodyFilter(
  "username",
  "password",
  "email",
  "name"
);

const middlewares1 = [withAuth, connectDB];
const middlewares2 = [withAuth, requestBodyFilter, connectDB];

userRouter.get("/:id", ...middlewares1, ctrl.get);

// No withAuth middleware because anyone can create new user (be a member)
userRouter.post("/", requestBodyFilter, connectDB, ctrl.create);

userRouter.post("/update/:id", ...middlewares1, ctrl.update);

// No need to use withRequestBodyFilter middleware for PUT and PATCH method
userRouter.put("/:id", ...middlewares1, ctrl.update);
userRouter.patch("/:id", ...middlewares1, ctrl.update);

userRouter.post("/delete/:id", ...middlewares1, ctrl.delete);
userRouter.delete("/:id", ...middlewares1, ctrl.delete);

module.exports = userRouter;
