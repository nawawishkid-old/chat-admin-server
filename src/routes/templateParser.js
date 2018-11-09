const { Router } = require("express");
const ctrl = require("../controllers/templateParser");
const { connectDB, withCreatorId } = require("../middlewares");
const { withAuth } = require("./middlewares");
const router = Router();

// Get
router.get("/:templateId", withCreatorId, withAuth, connectDB, ctrl.get);

module.exports = router;
