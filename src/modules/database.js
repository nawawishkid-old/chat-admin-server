const mongoose = require("mongoose");
const app = require("../init");
const APP_ENV = app.get("env");
const LOG_LEVEL = app.get("log level");
const HOST = app.get("mongodb host");
const PORT = app.get("mongodb port");
const NAME = app.get("mongodb db name");
const USERNAME = app.get("mongodb db username");
const PASSWORD = app.get("mongodb db password");
const AUTH_SOURCE = app.get("mongodb auth source");
const logger = require("./loggers/database");

exports.connect = () => {
  const { readyState } = mongoose.connection;
  const authSrc = AUTH_SOURCE ? `?authSource=${AUTH_SOURCE}` : "";
  const url = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${NAME}${authSrc}`;

  logger.debug("Trying to connect to " + url);

  // If already connected.
  if (readyState > 0 && readyState < 3) {
    logger.debug("Already connected to %", url);

    return;
  }

  if (APP_ENV === "development" && LOG_LEVEL !== "silent") {
    mongoose.set("debug", true);
  }

  mongoose.connect(
    url,
    { useNewUrlParser: true }
  );

  const db = mongoose.connection;

  db.on("error", err => {
    logger.debug("Connection error: " + err);
    logger.debug("Ready state: " + mongoose.connection.readyState);
  });
  db.once("open", () => {
    logger.debug("Connected to " + url);
    logger.debug("Ready state: " + mongoose.connection.readyState);
  });

  return db;
};
