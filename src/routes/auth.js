const { Router } = require("express");
const { getAuthToken, connectDB } = require("../middlewares");
const ctrl = require("../controllers/auth");
const router = Router();

/**
 * Get access token
 */
router.post("/token", connectDB, ctrl.get);

module.exports = router;
