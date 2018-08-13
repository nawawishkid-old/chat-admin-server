"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _index = require("../Logger/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TaskEventEmitter = function (_EventEmitter) {
  _inherits(TaskEventEmitter, _EventEmitter);

  function TaskEventEmitter(callback) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, TaskEventEmitter);

    var _this = _possibleConstructorReturn(this, (TaskEventEmitter.__proto__ || Object.getPrototypeOf(TaskEventEmitter)).call(this));

    _initialiseProps.call(_this);

    _this.promiseTaskCallback = _this._wrapWithPromise(callback);
    _this.options = _extends({
      retries: 0,
      retryAfter: 0,
      retryEvery: 0,
      alwaysThrow: false
    }, options);
    _this.state = {
      retried: 0,
      isFailed: false,
      isSuccess: false
    };
    return _this;
  }

  /**
   *
   *
   * @api
   * @returns {Task}
   */


  /**
   *
   *
   * @api
   * @returns {*}
   */


  /**
   * ===== Utils =====
   */
  //  _mayCall = (callback, ...rest) => {
  //    if (this._shouldCall(callback)) {
  //      return callback(...rest);
  //    }
  //
  //    return null;
  //  };
  //
  //  _shouldCall = callback => {
  //    return typeof callback === "function";
  //  };

  return TaskEventEmitter;
}(_events2.default);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.config = function (options) {
    _this2.options = _extends({}, _this2.options, options);

    return _this2;
  };

  this.perform = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _index2.default.debug("_PERFORM");

            _this2.params = params;

            _context.next = 4;
            return _this2.promiseTaskCallback.then(function (func) {
              return func.apply(undefined, _toConsumableArray(params));
            }).then(_this2._success).catch(_this2._unsuccess);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this2);
  }));

  this._success = function (result) {
    var onSuccessValue = _this2.emit('success', result);

    _index2.default.debug("_SUCCESS");
    _index2.default.debug("Success result: ", typeof result === "undefined" ? "undefined" : _typeof(result));
    _this2.state.isSuccess = true;

    return onSuccessValue === null ? err : onSuccessValue;
  };

  this._unsuccess = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _index2.default.debug("_UNSUCCESS");

              _this2.emit('unsuccess', err);

              if (!(_this2.options.retries < 1)) {
                _context2.next = 5;
                break;
              }

              _index2.default.debug("No retry.");

              return _context2.abrupt("return", _this2._failed(err));

            case 5:
              _context2.next = 7;
              return _this2._retry(err);

            case 7:
              return _context2.abrupt("return", _context2.sent);

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  this._retry = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(err) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _index2.default.debug("_RETRY");

              if (!(_this2.state.retried >= _this2.options.retries)) {
                _context4.next = 4;
                break;
              }

              _index2.default.debug("Maximum retry reached.");
              return _context4.abrupt("return", _this2._failed(err));

            case 4:

              _this2.state.retried++;

              _this2.emit('retry', err);

              if (!(_this2.options.retryAfter > 0)) {
                _context4.next = 9;
                break;
              }

              _index2.default.debug("Retry after " + _this2.options.retryAfter);

              return _context4.abrupt("return", _this2._setPromiseTimeout(_this2.options.retryAfter).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _index2.default.debug("THEN!");
                        _context3.next = 3;
                        return _this2._callWrappedTaskCallback();

                      case 3:
                        return _context3.abrupt("return", _context3.sent);

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this2);
              }))));

            case 9:
              _context4.next = 11;
              return _this2._callWrappedTaskCallback();

            case 11:
              return _context4.abrupt("return", _context4.sent);

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this2);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  this._failed = function (err) {
    var onFailedValue = _this2.emit('failed', err);

    _index2.default.debug("_FAILED");
    _this2.state.isFailed = true;

    if (onFailedValue === null) {
      throw err;
    }

    return onFailedValue;
  };

  this._callWrappedTaskCallback = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return _this2.promiseTaskCallback.then(function (func) {
              return func.apply(undefined, _toConsumableArray(_this2.params));
            }).then(_this2._success).catch(_this2._retry);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, _this2);
  }));

  this._wrapWithPromise = function (callback) {
    return Promise.resolve(callback);
  };

  this._setPromiseTimeout = function (ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  };
};

exports.default = TaskEventEmitter;