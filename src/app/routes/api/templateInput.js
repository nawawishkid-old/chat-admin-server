const { Router } = require("express");
const ctrl = require("../../controllers/templateInput");
const withRequestBodyFilter = require("../../middlewares/withRequestBodyFilter");

const templateInputRouter = Router();

const requestBodyFilter = withRequestBodyFilter.create(
  "name",
  "label",
  "componentScheme",
  "creatorId"
);

templateInputRouter.get("/:id?", ctrl.get);

templateInputRouter.post("/", requestBodyFilter, ctrl.create);

templateInputRouter.post("/update/:id", requestBodyFilter, ctrl.update);
templateInputRouter.put("/:id", requestBodyFilter, ctrl.update);
templateInputRouter.patch("/:id", requestBodyFilter, ctrl.update);

templateInputRouter.post("/delete/:id", ctrl.delete);
templateInputRouter.delete("/:id", ctrl.delete);

module.exports = templateInputRouter;
