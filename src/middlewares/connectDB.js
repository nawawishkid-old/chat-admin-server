module.exports = (req, res, next) => {
  const app = require("../init");
  const logLevel = app.get("log level");
  const host = app.get("mongodb host");
  const port = app.get("mongodb port");
  const name = app.get("mongodb db name");
  const username = app.get("mongodb db username");
  const password = app.get("mongodb db password");
  const authSrc = app.get("mongodb auth source");
  const isDebug = app.get("mongodb debug") === "on";
  const db = require("../modules/database");

  const connection = db.connect({
    host,
    port,
    name,
    username,
    password,
    authSrc,
    isDebug
  })();

  next();
};
