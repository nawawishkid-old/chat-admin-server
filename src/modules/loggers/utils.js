const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, splat, simple, printf } = format;
const { LOG_DIR } = require("../../configs/app");

const customFormat = printf(
  info =>
    `[${info.label.toUpperCase()}] ${info.level.toUpperCase()} ${
      info.timestamp
    } "${info.message}"`
);

exports.getLogger = (level, logLabel) =>
  createLogger({
    level,
    format: combine(
      label({ label: logLabel }),
      timestamp(),
      splat(),
      customFormat
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: LOG_DIR + "/access.log", level: "info" }),
      new transports.File({ filename: LOG_DIR + "/error.log", level: "error" })
    ]
  });
