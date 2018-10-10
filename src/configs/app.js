const {
  CHATADMIN_ENV,
  CHATADMIN_HOST,
  CHATADMIN_PORT,
  CHATADMIN_BASE_URL,
  CHATADMIN_LOG_DIR,
  CHATADMIN_LOG_LEVEL,
  CHATADMIN_LOG_TYPE,
  CHATADMIN_SECRET
} = process.env;

if (!CHATADMIN_SECRET) {
  throw new Error("App's secret key is required.");
}

exports.APP_ENV = CHATADMIN_ENV || "development";
exports.HOST = CHATADMIN_HOST || "0.0.0.0";
exports.PORT = CHATADMIN_PORT || 8080;
exports.BASE_URL = CHATADMIN_BASE_URL || "";
exports.LOG_DIR = CHATADMIN_LOG_DIR || ".";
exports.LOG_TYPE = CHATADMIN_LOG_TYPE || "all"; // 'middleware', 'controller', 'app', 'database', 'all'
exports.LOG_LEVEL =
  CHATADMIN_LOG_LEVEL || exports.APP_ENV === "production" ? "info" : "debug";
exports.SECRET_KEY = CHATADMIN_SECRET;
exports.ACCESS_TOKEN_LIFESPAN = 60 * 60;
exports.REFRESH_TOKEN_LIFESPAN = 60 * 30;
