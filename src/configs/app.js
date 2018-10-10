exports.APP_ENV = process.env.APP_ENV || "development";
exports.HOST = process.env.APP_HOST || "0.0.0.0";
exports.PORT = process.env.APP_PORT || 11112;
exports.BASE_URL = process.env.APP_BASE_URL || "";
exports.LOG_DIR = process.env.APP_LOG_DIR || ".";

const secret =
  process.env.ENV === "production"
    ? process.env.SECRET
    : process.env.SECRET || "secret";

exports.SECRET_KEY = secret;
exports.ACCESS_TOKEN_LIFESPAN = 60 * 60;
exports.REFRESH_TOKEN_LIFESPAN = 60 * 30;
