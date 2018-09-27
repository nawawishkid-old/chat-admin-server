const { Router } = require("express");
const ctrl = require("../../controllers/templateInput");
const {
  withAuth,
  withRequestBodyFilter,
  withCreatorId,
  connectDB
} = require("../../middlewares");

const router = Router();

const requestBodyFilter = withRequestBodyFilter.create(
  "name",
  "label",
  "componentScheme",
  "creatorId"
);

const middlewares1 = [withAuth, connectDB];
const middlewares2 = [withAuth, withCreatorId, requestBodyFilter, connectDB];

router.get("/:id?", ...middlewares1, ctrl.get);

router.post("/", ...middlewares2, ctrl.create);

router.post("/update/:id", ...middlewares2, ctrl.update);
router.put("/:id", ...middlewares2, ctrl.update);
router.patch("/:id", ...middlewares2, ctrl.update);

router.post("/delete/:id", ...middlewares1, ctrl.delete);
router.delete("/:id", ...middlewares1, ctrl.delete);

module.exports = router;
