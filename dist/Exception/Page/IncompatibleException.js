"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IncompatibleException = undefined;

var _BaseException2 = require("../BaseException");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IncompatibleException = function (_BaseException) {
  _inherits(IncompatibleException, _BaseException);

  function IncompatibleException() {
    var _ref;

    _classCallCheck(this, IncompatibleException);

    for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
      params[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = IncompatibleException.__proto__ || Object.getPrototypeOf(IncompatibleException)).call.apply(_ref, [this, "IncompatibleException"].concat(params)));
  }

  return IncompatibleException;
}(_BaseException2.BaseException);

exports.IncompatibleException = IncompatibleException;