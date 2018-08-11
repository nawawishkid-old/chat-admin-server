"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _winstonTransport = require("winston-transport");

var _winstonTransport2 = _interopRequireDefault(_winstonTransport);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpResponseTransport = function (_Transport) {
  _inherits(HttpResponseTransport, _Transport);

  function HttpResponseTransport(opts) {
    _classCallCheck(this, HttpResponseTransport);

    // Do something with `opts` here!
    var _this = _possibleConstructorReturn(this, (HttpResponseTransport.__proto__ || Object.getPrototypeOf(HttpResponseTransport)).call(this, opts));

    _this.log = function (level, message) {
      // http
    };

    return _this;
  }

  return HttpResponseTransport;
}(_winstonTransport2.default);

exports.default = HttpResponseTransport;