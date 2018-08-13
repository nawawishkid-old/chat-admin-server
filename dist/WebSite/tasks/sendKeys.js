"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Task = require("../../Task/Task");

var _Task2 = _interopRequireDefault(_Task);

var _findElement = require("./findElement");

var _findElement2 = _interopRequireDefault(_findElement);

var _index = require("../../Logger/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sendKeysTask = new _Task2.default(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(elem, value) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return elem.sendKeys(value);

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

sendKeysTask.on("success", function (task, result) {
  task.logger("info", "Input filled.");
});

sendKeysTask.on("failed", function (task, err) {
  task.logger("error", "Could not fill input: " + err.message);
});

sendKeysTask.config({
  title: "sendKeysTask"
});

var task = new _Task2.default(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(driver, selector, value) {
    var elem;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _index2.default.debug("Performing sendKeys...");

            _findElement2.default.on("success", function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(elem) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _index2.default.info("Filling input");
                        // await sendKeysTask.perform(elem, value);

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }());

            _findElement2.default.on("failed", function (err) {
              return _index2.default.error("Failed naja", err.message);
            });

            _context3.next = 5;
            return _findElement2.default.perform(driver, selector);

          case 5:
            elem = _context3.sent;
            _context3.next = 8;
            return sendKeysTask.perform(elem, value);

          case 8:
            return _context3.abrupt("return", _context3.sent);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}());

exports.default = sendKeysTask;