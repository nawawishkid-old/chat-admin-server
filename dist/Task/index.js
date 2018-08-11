"use strict";

var _Task = require("./Task");

var _Task2 = _interopRequireDefault(_Task);

var _index = require("../Logger/index");

var _index2 = _interopRequireDefault(_index);

var _nodeFetch = require("node-fetch");

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var callback = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _index2.default.info("Hello, world!");
            _context.next = 3;
            return (0, _nodeFetch2.default)("https://google.come").then(function (response) {
              return console.log(response);
            });

          case 3:
            return _context.abrupt("return", _context.sent);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function callback() {
    return _ref.apply(this, arguments);
  };
}();

var options = {
  // retries: 3,
  // retryAfter: 500,
  onFailed: function onFailed(err) {
    _index2.default.error("I'm failed!");
  },
  onSuccess: function onSuccess(result) {
    _index2.default.info("I'm success!");
  }
};

var myTask = new _Task2.default(callback, options);

myTask.perform();