const { LOG_LEVEL, LOG_TYPE } = require("./app");
const logTypes = LOG_TYPE.split(",");
const isAll = LOG_TYPE === "all";

const isIn = type => logTypes.includes(type);
const isLog = type => isAll || isIn(type);
const getLevel = type => (isLog(type) ? LOG_LEVEL : "silent");

exports.app = {
  LEVEL: getLevel("app"),
  LABEL: "App"
};
exports.middleware = {
  LEVEL: getLevel("middleware"),
  LABEL: "Middleware"
};
exports.controller = {
  LEVEL: getLevel("controller"),
  LABEL: "Controller"
};
exports.database = {
  LEVEL: getLevel("database"),
  LABEL: "Database"
};

exports.api = {
  LEVEL: LOG_LEVEL,
  LABEL: "API"
};
