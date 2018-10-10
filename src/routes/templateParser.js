const { Router } = require("express");
const ctrl = require("../controllers/templateParser");
const { withAuth, connectDB } = require("../middlewares");

const router = Router();

// Get
router.get("/:templateId", withAuth, connectDB, ctrl.get);

module.exports = router;
