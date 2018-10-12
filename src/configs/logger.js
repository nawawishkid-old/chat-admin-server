/**
 * Set app global variables
 *
 * @param {Object} app Express app object (created by calling express())
 * @return {Object} app
 */
module.exports = app => {
  const logType = app.get("log type");
  const logList = logType.split(",");
  const isAll = logType === "all";
  const isIn = type => logList.includes(type);
  const isLog = type => isAll || isIn(type);
  const getLevel = type => (isLog(type) ? app.get("log level") : "silent");

  app.set("log app", {
    LEVEL: getLevel("app"),
    LABEL: "App"
  });
  app.set("log middleware", {
    LEVEL: getLevel("middleware"),
    LABEL: "Middleware"
  });
  app.set("log controller", {
    LEVEL: getLevel("controller"),
    LABEL: "Controller"
  });
  app.set("log database", {
    LEVEL: getLevel("database"),
    LABEL: "Database"
  });

  return app;
};
