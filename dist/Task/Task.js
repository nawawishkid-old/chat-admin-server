"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require("../Logger/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Should have 'within' options
 * Should extends Node's EventEmitter class
 */
var Task = function Task(callback) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _classCallCheck(this, Task);

  _initialiseProps.call(this);

  this.promiseTaskCallback = this._wrapWithPromise(callback);
  this.options = _extends({
    retries: 0,
    retryAfter: 0,
    retryEvery: 0,
    alwaysThrow: false
  }, options);
  this.state = {
    retried: 0,
    isFailed: false,
    isSuccess: false
  };
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
 * @returns {Task}
 */


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
;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.onFailed = function (callback) {
    _this.options.onFailed = callback;

    return _this;
  };

  this.onSuccess = function (callback) {
    _this.options.onSuccess = callback;

    return _this;
  };

  this.config = function (options) {
    _this.options = _extends({}, _this.options, options);

    return _this;
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

            _this.params = params;

            _context.next = 4;
            return _this.promiseTaskCallback.then(function (func) {
              return func.apply(undefined, _toConsumableArray(params));
            }).then(_this._success).catch(_this._unsuccess);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  this._success = function (result) {
    var onSuccessValue = _this._mayCall(_this.options.onSuccess, result);

    _index2.default.debug("_SUCCESS");
    _index2.default.debug("Success result: ", typeof result === "undefined" ? "undefined" : _typeof(result));
    _this.state.isSuccess = true;

    return onSuccessValue === null ? result : onSuccessValue;
  };

  this._unsuccess = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _index2.default.debug("_UNSUCCESS");

              if (!(_this.options.retries < 1)) {
                _context2.next = 4;
                break;
              }

              _index2.default.debug("No retry.");

              return _context2.abrupt("return", _this._failed(err));

            case 4:
              _context2.next = 6;
              return _this._retry(err);

            case 6:
              return _context2.abrupt("return", _context2.sent);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this);
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

              if (!(_this.state.retried >= _this.options.retries)) {
                _context4.next = 4;
                break;
              }

              _index2.default.debug("Maximum retry reached.");
              return _context4.abrupt("return", _this._failed(err));

            case 4:

              _this.state.retried++;

              if (!(_this.options.retryAfter > 0)) {
                _context4.next = 8;
                break;
              }

              _index2.default.debug("Retry after " + _this.options.retryAfter);

              return _context4.abrupt("return", _this._setPromiseTimeout(_this.options.retryAfter).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _index2.default.debug("THEN!");
                        _context3.next = 3;
                        return _this._callWrappedTaskCallback();

                      case 3:
                        return _context3.abrupt("return", _context3.sent);

                      case 4:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, _this);
              }))));

            case 8:
              _context4.next = 10;
              return _this._callWrappedTaskCallback();

            case 10:
              return _context4.abrupt("return", _context4.sent);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  this._failed = function (err) {
    var onFailedValue = _this._mayCall(_this.options.onFailed, err);

    _index2.default.debug("_FAILED");
    _this.state.isFailed = true;

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
            return _this.promiseTaskCallback.then(function (func) {
              return func.apply(undefined, _toConsumableArray(_this.params));
            }).then(_this._success).catch(_this._retry);

          case 2:
            return _context5.abrupt("return", _context5.sent);

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  }));

  this._mayCall = function (callback) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }

    if (_this._shouldCall(callback)) {
      return callback.apply(undefined, rest);
    }

    return null;
  };

  this._shouldCall = function (callback) {
    return typeof callback === "function";
  };

  this._wrapWithPromise = function (callback) {
    return Promise.resolve(callback);
  };

  this._setPromiseTimeout = function (ms) {
    return new Promise(function (resolve) {
      setTimeout(resolve, ms);
    });
  };
};

exports.default = Task;