/**
 * Set app global variables
 *
 * @param {Object} app Express app object (created by calling express())
 * @return {Object} app
 */
module.exports = app => {
  const { env } = require("../utils");

  const validateEnv = value => {
    if (!value) {
      return "development";
    }

    const envs = ["development", "production"];

    if (!envs.includes(value)) {
      throw new Error(
        `Unknown app environment: ${value}.\nAvailable environments are ${envs.join(
          ","
        )}`
      );
    }

    return value;
  };

  const validateLogType = value => {
    if (!value) {
      return "all";
    }

    const logTypes = ["middleware", "controller", "app", "database", "all"];

    if (!logTypes.includes(value)) {
      throw new Error(
        `Unknown log type: ${value}. Avaliable log types are ${logTypes.join(
          ","
        )}`
      );
    }

    return value;
  };

  const validateLogLevel = () =>
    app.get("env") === "production" ? "info" : "debug";

  const validateSecret = value => {
    if (!value) {
      throw new Error("Require app's secret key");
    }

    return value;
  };

  app.set("env", env("CHATADMIN_ENV", validateEnv));
  app.set("host", env("CHATADMIN_HOST", "0.0.0.0"));
  app.set("port", env("CHATADMIN_PORT", 80));
  app.set("base url", env("CHATADMIN_BASE_URL"));
  app.set("log directory", env("CHATADMIN_LOG_DIR", "."));
  app.set("log type", env("CHATADMIN_LOG_TYPE", validateLogType));
  app.set("log level", env("CHATADMIN_LOG_LEVEL", validateLogLevel));
  app.set("secret", env("CHATADMIN_SECRET", validateSecret));
  app.set("access token lifespan", 60 * 60);
  app.set("refresh token lifespan", 60 * 30);

  return app;
};
