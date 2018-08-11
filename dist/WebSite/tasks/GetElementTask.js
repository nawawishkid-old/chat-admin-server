"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Task2 = require("../../../Task/Task");

var _Task3 = _interopRequireDefault(_Task2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GetElementTask = function (_Task) {
  _inherits(GetElementTask, _Task);

  function GetElementTask() {
    _classCallCheck(this, GetElementTask);

    return _possibleConstructorReturn(this, (GetElementTask.__proto__ || Object.getPrototypeOf(GetElementTask)).apply(this, arguments));
  }

  return GetElementTask;
}(_Task3.default);

exports.default = GetElementTask;