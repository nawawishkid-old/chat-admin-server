"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendKeys = exports.findElement = undefined;

var _findElement = require("./findElement");

var _findElement2 = _interopRequireDefault(_findElement);

var _sendKeys = require("./sendKeys");

var _sendKeys2 = _interopRequireDefault(_sendKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.findElement = _findElement2.default;
exports.sendKeys = _sendKeys2.default;
exports.default = {
  findElement: _findElement2.default,
  sendKeys: _sendKeys2.default
};