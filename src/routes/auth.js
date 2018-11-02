const { Router } = require("express");
const connectDB = require("../middlewares/connectDB");
const ctrl = require("../controllers/auth");
const app = require("../init");
const getAccessToken = ctrl.getAccessToken({
  secret: app.get("secret"),
  accessTokenLifespan: app.get("access token lifespan")
});
const router = Router();

/**
 * Get access token
 */
router.post("/token", connectDB, getAccessToken);

module.exports = router;
