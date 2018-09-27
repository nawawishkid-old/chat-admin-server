const { Router } = require("express");
const ctrl = require("../../controllers/template");
const withRequestBodyFilter = require("../../middlewares/withRequestBodyFilter");
const withCors = require("../../middlewares/withCors");
const router = Router();
const requestBodyFilter = withRequestBodyFilter.create("inputs");

router.options("/", withCors);

router.get("/:id?", withCors, ctrl.get);

router.post("/", requestBodyFilter, ctrl.create);

router.post("/update/:id", ctrl.update);
router.put("/:id", ctrl.update);
router.patch("/:id", ctrl.update);

router.post("/delete/:id", ctrl.delete);
router.delete("/:id", ctrl.delete);

module.exports = router;
