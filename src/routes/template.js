const { Router } = require("express");
const ctrl = require("../controllers/template");
const {
  withRequestBodyFilter,
  withCreatorId,
  connectDB
} = require("../middlewares");
const { withAuth } = require('./middlewares');
const router = Router();

const requestBodyFilter = withRequestBodyFilter.create(
  "name",
  "content",
  "openTag",
  "closingTag",
  "inputs",
  "creatorId"
);

const middlewares1 = [withAuth, withCreatorId, connectDB];
const middlewares2 = [
  withAuth,
  withCreatorId,
  requestBodyFilter,
  connectDB
];

router.get("/:id?", ...middlewares1, ctrl.get);

router.post("/", ...middlewares2, ctrl.create);

router.post("/update/:id", ...middlewares2, ctrl.update);
router.put("/:id", ...middlewares2, ctrl.update);
router.patch("/:id", ...middlewares2, ctrl.update);

router.post("/delete/:id", ...middlewares1, ctrl.delete);
router.delete("/:id", ...middlewares1, ctrl.delete);

module.exports = router;
