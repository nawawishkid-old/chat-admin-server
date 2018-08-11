'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Task = require('./Task');

var _Task2 = _interopRequireDefault(_Task);

var _findElement = require('./findElement');

var _findElement2 = _interopRequireDefault(_findElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var task = new _Task2.default(function (driver, selector, value) {
  driver.findElement.perform(driver, selector).then(function (elem) {
    logger.info('Element found naja.');
    elem.sendKeys(value);
  }).catch(function (err) {
    logger.error('Could not fill input: ', err);
  });
});

exports.default = task;