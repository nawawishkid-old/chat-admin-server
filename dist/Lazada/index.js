"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.page = exports.action = undefined;

var _index = require("./actions/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./pages/index");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.action = _index2.default;
exports.page = _index4.default;
exports.default = {
  action: _index2.default,
  page: _index4.default
};