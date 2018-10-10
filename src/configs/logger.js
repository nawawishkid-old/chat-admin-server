const { APP_ENV } = require("./app");
const level = APP_ENV === "production" ? "info" : "debug";

exports.app = {
  LEVEL: level,
  LABEL: "App"
};
exports.middleware = {
  LEVEL: level,
  LABEL: "Middleware"
};

exports.api = {
  LEVEL: level,
  LABEL: "API"
};
