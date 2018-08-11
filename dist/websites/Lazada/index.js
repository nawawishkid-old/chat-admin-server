"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lazada = undefined;

require("babel-polyfill");

var _WebSite2 = require("../../WebSite/WebSite");

var _WebSite3 = _interopRequireDefault(_WebSite2);

var _index = require("./pages/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import action from "./actions/index";


var Lazada = function (_WebSite) {
  _inherits(Lazada, _WebSite);

  function Lazada(driver) {
    _classCallCheck(this, Lazada);

    var _this = _possibleConstructorReturn(this, (Lazada.__proto__ || Object.getPrototypeOf(Lazada)).call(this, driver));

    _this.signUp = function () {
      // console.log(this.pages.SignUp);
      var page = new _this.pages.SignUp(_this.driver);
      return page.signUp.apply(page, arguments);
    };

    _this.pages = {
      SignUp: _index2.default.SignUpPage
    };
    return _this;
  }

  return Lazada;
}(_WebSite3.default);

exports.Lazada = Lazada;