"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _TaskEventEmitter = require("../../Task/TaskEventEmitter");

var _TaskEventEmitter2 = _interopRequireDefault(_TaskEventEmitter);

var _seleniumWebdriver = require("selenium-webdriver");

var _index = require("../../Logger/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// const findElement = (driver, selector) => {
var task = new _TaskEventEmitter2.default(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(driver, selector) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return driver.findElement(_seleniumWebdriver.By.css(selector));

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

// task.config({
task.on('success', function (elem, task) {
  _index2.default.info("Element found.");
  return elem;
});

task.on('failed', function (err, task) {
  _index2.default.error("Element not found.", err);

  if (task.options.alwaysThrow) {
    throw err;
  }
});
// });

// task.config({
//   retry: 3
// });

// task.perform(selector)
//   .then(elem => {
//     logger.info("Element found.");
//     return elem;
//   })
//   .catch(err => {
//     logger.error("Element not found.");
//   });

//   return await task;
// };

// console.log('TASK: ', task);
console.log('config: ', _typeof(task.config));

exports.default = task;