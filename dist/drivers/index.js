"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seleniumWebdriver = require("selenium-webdriver");

var _chrome = require("selenium-webdriver/chrome");

var _chrome2 = _interopRequireDefault(_chrome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var screen = {
  width: 1366,
  height: 768
};

console.log("Initializing driver...");

var Driver = new _seleniumWebdriver.Builder().withCapabilities(_seleniumWebdriver.Capabilities.chrome()).setChromeOptions(new _chrome2.default.Options().headless().windowSize(screen)).build();

exports.default = Driver;