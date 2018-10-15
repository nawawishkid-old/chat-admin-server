/**
 * Middleware pre-config for this specific app's routes
 */
const app = require("../init");
const withAuth = require("../middlewares/withAuth");
const appSecret = app.get("secret");

exports.withAuth = withAuth({ secret: appSecret });

const removeBaseUrl = require("../middlewares/removeBaseUrl");
const BASE_URL = app.get("base url");

exports.removeBaseUrl = removeBaseUrl(BASE_URL);
