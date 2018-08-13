"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SignUpPage = undefined;

var _Page2 = require("../../../WebSite/Page");

var _Page3 = _interopRequireDefault(_Page2);

var _seleniumWebdriver = require("selenium-webdriver");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUpPage = function (_Page) {
  _inherits(SignUpPage, _Page);

  function SignUpPage(driver) {
    var _this2 = this;

    _classCallCheck(this, SignUpPage);

    var _this = _possibleConstructorReturn(this, (SignUpPage.__proto__ || Object.getPrototypeOf(SignUpPage)).call(this, driver, "SignUp", "https://member.lazada.co.th/user/register"));

    _this.elementSelectors = {
      submit: "form .mod-login .mod-change-register-btn button",
      fullName: "form .mod-login .mod-login-input-name input[type=text]",
      email: "form .mod-login .mod-login-input-email input[type=text]",
      password: "form .mod-login .mod-login-input-password input[type=password]",
      repassword: "form .mod-login .mod-login-input-re-password input[type=password]"
    };

    _this.signUp = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fullName, email, password) {
        var elem;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.load();

              case 2:
                _context.next = 4;
                return _this.task.findElement.config({ retries: 3, retryAfter: 500, exitOnFailed: true }).perform(_this.driver, _this.elementSelectors.fullName);

              case 4:
                elem = _context.sent;
                _context.next = 7;
                return _this.task.sendKeys.perform(elem, fullName);

              case 7:
                // await this.task.sendKeys.perform(this.driver, this.elementSelectors.fullName, fullName);

                // console.log('findElem: ', this.task.findElement);

                // const elem = await this.task.findElement
                //   .config({ retries: 3, retryAfter: 500 })
                //   .perform(this.driver, this.elementSelectors.fullName + 'aa');

                // console.log('ELEM: ', elem);

                // const fullNameInput = await this.getElement("fullName").then(elem =>
                //   elem.sendKeys(fullName)
                // );
                // .catch(err =>
                //   console.log("ERROR: ", err)
                // );
                // const emailInput = await this.getElement("email");
                // const passwordInput = await this.getElement("password");
                // const rePasswordInput = await this.getElement("repassword");
                // const submitBtn = await this.getElement("submit");

                // await Promise.all([
                //   fullNameInput.sendKeys(fullName)
                //   emailInput.sendKeys(email),
                //   passwordInput.sendKeys(password),
                //   rePasswordInput.sendKeys(password)
                // ])
                //   .then(async value => await this.selfie())
                //   .catch(err => console.log(err));

                _this.close();

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      };
    }();

    return _this;
  }

  return SignUpPage;
}(_Page3.default);

exports.SignUpPage = SignUpPage;