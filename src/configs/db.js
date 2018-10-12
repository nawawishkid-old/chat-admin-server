/**
 * Set app global variables
 *
 * @param {Object} app Express app object (created by calling express())
 * @return {Object} app
 */
module.exports = app => {
  const { env } = require("../utils");
  const throwIfEmpty = msg => value => {
    if (!value) {
      throw new Error(msg);
    }

    return value;
  };
  const HOST = env("CHATADMIN_DB_HOST", "0.0.0.0");
  const PORT = env("CHATADMIN_DB_PORT", 27017);
  const NAME = env("CHATADMIN_DB_NAME", throwIfEmpty("Required database name"));
  const USERNAME = env(
    "CHATADMIN_DB_USERNAME",
    throwIfEmpty("Required database username")
  );
  const PASSWORD = env(
    "CHATADMIN_DB_PASSWORD",
    throwIfEmpty("Required database password")
  );
  const AUTH_SOURCE = env("CHATADMIN_DB_AUTH_SOURCE");

  app.set("mongodb host", HOST);
  app.set("mongodb port", PORT);
  app.set("mongodb db name", NAME);
  app.set("mongodb db username", USERNAME);
  app.set("mongodb db password", PASSWORD);
  app.set("mongodb auth source", AUTH_SOURCE);

  return app;
};
