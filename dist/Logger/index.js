"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winston = require("winston");

var _winston2 = _interopRequireDefault(_winston);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const { combine, printf } = format;
var myFormat = _winston.format.printf(function (info) {
  return "[" + info.label + "] " + info.level + ": " + info.message;
});

exports.default = _winston2.default.createLogger({
  level: "debug",
  // format: winston.format.simple(),
  format: _winston.format.combine(_winston.format.colorize(),
  // format.timestamp(),
  _winston.format.label({ label: "Task" }), myFormat),
  transports: [new _winston2.default.transports.Console()]
});