"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require("../../../drivers/index");

var _index2 = _interopRequireDefault(_index);

var _seleniumWebdriver = require("selenium-webdriver");

var _index3 = require("../pages/index");

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// Need exception handler
var ActionSignUp = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Requesting page...");

            _context2.next = 3;
            return _index2.default.get(_index4.default.SignUp.url).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              var element;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      console.log("Response received.");
                      console.log("Authenticating page...");

                      element = _index2.default.findElement(_seleniumWebdriver.By.css(_index4.default.SignUp.evidenceElement + "aaa")).then(function () {
                        return console.log("Page authenticated.");
                      }).catch(function (err) {
                        return console.log("Page unauthenticated.");
                      });

                      // console.log(await element.getTagName());

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, undefined);
            })));

          case 3:

            _index2.default.quit();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function ActionSignUp() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = ActionSignUp;