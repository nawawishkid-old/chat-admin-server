exports.HOST = process.env.CHATADMIN_APP_HOST || "0.0.0.0";
exports.PORT = process.env.CHATADMIN_APP_PORT || 11112;
exports.BASE_URL = process.env.CHATADMIN_APP_BASE_URL || "";

const secret =
  process.env.CHATADMIN_ENV === "production"
    ? process.env.CHATADMIN_SECRET
    : process.env.CHATADMIN_SECRET || "secret";

exports.SECRET_KEY = secret;
exports.ACCESS_TOKEN_LIFESPAN = 60 * 60;
exports.REFRESH_TOKEN_LIFESPAN = 60 * 30;
