'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseException = function (_Error) {
  _inherits(BaseException, _Error);

  function BaseException(name) {
    var _console, _ref;

    _classCallCheck(this, BaseException);

    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    (_console = console).log.apply(_console, ['Params: '].concat(params));
    // Pass remaining arguments (including vendor specific ones) to parent constructor

    var _this = _possibleConstructorReturn(this, (_ref = BaseException.__proto__ || Object.getPrototypeOf(BaseException)).call.apply(_ref, [this].concat(params)));

    _this.name = name;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, BaseException);
    }

    // Custom debugging information
    // this.foo = foo;
    // this.date = new Date();
    return _this;
  }

  return BaseException;
}(Error);

exports.BaseException = BaseException;