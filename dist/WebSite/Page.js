"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seleniumWebdriver = require("selenium-webdriver");

var _index = require("../Exception/index");

var _Task = require("../Task/Task");

var _Task2 = _interopRequireDefault(_Task);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _index2 = require("../Logger/index");

var _index3 = _interopRequireDefault(_index2);

var _index4 = require("./tasks/index");

var _index5 = _interopRequireDefault(_index4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Page =

/**
 *
 * @param {ThenableWebDriver} driver Selenium webdriver instance.
 * @return void
 */


/**
 * @prop {Boolean} isClosed Is page active?
 */


/**
 * @prop {String{}} elementSelectors Object of CSS Selector of all HTML elements needed to operate the page's actions.
 */


/**
 * @prop {String} name Name of the page.
 */
function Page(driver, name, url) {
  _classCallCheck(this, Page);

  _initialiseProps.call(this);

  this.name = name;
  this.url = url;
  this.driver = driver;
  this.task = {
    findElement: _index5.default.findElement
    // ...tasks
  };
}

/**
 * @prop {Boolean} isInit Is page initialized?
 */


/**
 * @prop {Boolean} isLoaded Is page loaded?
 */


/**
 * @prop {String} url The page's url.
 */

/**
 * @prop {ThenableWebDriver} driver Selenium webdriver instance.
 */


/**
 * Check if the HTML of the page still valid.
 */
;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.elementSelectors = {};
  this.isLoaded = false;
  this.isClosed = true;
  this.isInit = false;
  this.load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_this.init && _this.isClosed)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            if (!_this.isLoaded) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return", _this.driver);

          case 4:

            _this.isClosed = false;
            _this.init = true;

            _index3.default.info("Loading page from " + _this.url);

            _context.next = 9;
            return _this.driver.get(_this.url).then(function () {
              _index3.default.info("Page loaded.");
              _this.isLoaded = true;
              _this.checkCompatibility();
            }).catch(function (err) {
              _index3.default.info("FAILD: Could not get page from given url:" + _this.url);
              return err;
            });

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  this.checkCompatibility = function () {
    _index3.default.info("Checking HTML compatibility...");

    try {
      // logger.info('isCompatible: ', this.isCompatible());
      if (!_this.isCompatible()) {
        throw new _index.IncompatibleException("The page '" + _this.name + "' is incompatible with your code.");
      }
    } catch (error) {
      _index3.default.info("This is error: ", error);

      _this.close();
    }

    _index3.default.info("Page is compatible.");
    _index3.default.info("Start performing page's action...");

    return true;
  };

  this.isCompatible = function () {
    // logger.info("Page.isCompatible()");
    return Object.values(_this.elementSelectors).every(function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(selector) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.elementExists(selector);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  };

  this.selfie = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // logger.info("Page.selfie()");
            _index3.default.info("Taking page screenshot...");
            _context3.next = 3;
            return _this.load();

          case 3:
            _context3.next = 5;
            return _this.driver.takeScreenshot().then(function (img, err) {
              _index3.default.info("Image base64 first 100 chars: " + img.substr(0, 100));
              _fs2.default.writeFile("./storage/Lazada/screenshots/" + Date.now() + ".png", img, "base64", function (err) {
                return _index3.default.info("FileSystem Callback: ", err);
              });
            });

          case 5:
            return _context3.abrupt("return", _context3.sent);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  this.close = function () {
    _index3.default.info("Closing page...");

    _this.isClosed = true;

    _index3.default.info("Page closed.");
  };

  this.elementExists = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(selector) {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              // logger.info("Page.elementExists()");
              _index3.default.debug("Finding HTML element using CSS selector: '" + selector + "'.");

              _context4.next = 3;
              return _this.driver.findElements(_seleniumWebdriver.By.css(selector)).then(function () {
                _index3.default.debug("SUCCESS: Element found.");
                return true;
              }).catch(function () {
                _index3.default.debug("FAILED: Element not found.");
                return false;
              });

            case 3:
              return _context4.abrupt("return", _context4.sent);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, _this);
    }));

    return function (_x2) {
      return _ref4.apply(this, arguments);
    };
  }();

  this.getElement = function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(name) {
      var selector, callback, options, task;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _this.load();

            case 2:
              selector = _this.elementSelectors[name];

              callback = function () {
                var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(selector) {
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return _this.driver.findElement(_seleniumWebdriver.By.css(selector));

                        case 2:
                          return _context5.abrupt("return", _context5.sent);

                        case 3:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, _this);
                }));

                return function callback(_x4) {
                  return _ref6.apply(this, arguments);
                };
              }();

              options = {
                retries: 3,
                retryAfter: 2000
                // onSuccess: elem => {
                //   logger.debug("SUCCESS: Got and return element.");
                //   return elem;
                // },
                // onFailed: err => {
                //   logger.error(`FAILED: Could not find element using '${selector}'.`);
                //   return err;
                // }
              };
              task = new _Task2.default(callback, options);

              // task.onSuccess(elem => {
              //   logger.debug("SUCCESS: Got and return element.");
              //   return elem;
              // });

              // task.onFailed(err => {
              //   logger.error(`FAILED: Could not find element using '${selector}'.`);
              //   return err;
              // });

              _context6.next = 8;
              return task.perform(selector).then(function (elem) {
                _index3.default.debug("SUCCESS: Got and return element.");
                return elem;
              }).catch(function (err) {
                _index3.default.error("FAILED: Could not find element using '" + selector + "'.");
                return err;
              });

            case 8:
              return _context6.abrupt("return", _context6.sent);

            case 9:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x3) {
      return _ref5.apply(this, arguments);
    };
  }();
};

exports.default = Page;