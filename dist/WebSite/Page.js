"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _seleniumWebdriver = require("selenium-webdriver");

var _error = require("selenium-webdriver/lib/error");

var _index = require("../Exception/index");

var _Task = require("../Task/Task");

var _Task2 = _interopRequireDefault(_Task);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _page = require("../Logger/page");

var _page2 = _interopRequireDefault(_page);

var _index2 = require("./tasks/index");

var _index3 = _interopRequireDefault(_index2);

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
    findElement: _index3.default.findElement,
    sendKeys: _index3.default.sendKeys
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


/**
 * Implement Array.prototype.every() on Object asynchronously.
 */
;

var _initialiseProps = function _initialiseProps() {
  var _this = this;

  this.elementSelectors = {};
  this.isLoaded = false;
  this.isClosed = true;
  this.isInit = false;
  this.load = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(_this.init && _this.isClosed)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            if (!_this.isLoaded) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", _this.driver);

          case 4:

            _this.isClosed = false;
            _this.init = true;

            _page2.default.info("Loading page from " + _this.url);

            _context2.next = 9;
            return _this.driver.get(_this.url).then(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _page2.default.info("Page loaded.");
                      _this.isLoaded = true;
                      _context.next = 4;
                      return _this.checkCompatibility();

                    case 4:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, _this);
            }))).catch(function (err) {
              _page2.default.info("FAILED: Could not get page from given url:" + _this.url);
              return err;
            });

          case 9:
            return _context2.abrupt("return", _context2.sent);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));
  this.checkCompatibility = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var isCompatible;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _page2.default.info("Checking HTML compatibility...");

            _context3.next = 3;
            return _this.isCompatible();

          case 3:
            isCompatible = _context3.sent;
            _context3.prev = 4;

            if (isCompatible) {
              _context3.next = 7;
              break;
            }

            throw new _index.IncompatibleException("The page '" + _this.name + "' has incompatible HTML structure with given selector.");

          case 7:
            _context3.next = 14;
            break;

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](4);

            _page2.default.error(_context3.t0.message);

            _this.close();

            return _context3.abrupt("return");

          case 14:

            _page2.default.info("Page is compatible.");
            _page2.default.info("Start performing page's action...");

            return _context3.abrupt("return", true);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, _this, [[4, 9]]);
  }));
  this.isCompatible = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
    var selectors, key;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // logger.info("Page.isCompatible()");
            selectors = _this.elementSelectors;
            _context4.t0 = regeneratorRuntime.keys(selectors);

          case 2:
            if ((_context4.t1 = _context4.t0()).done) {
              _context4.next = 12;
              break;
            }

            key = _context4.t1.value;

            if (selectors.hasOwnProperty(key)) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("continue", 2);

          case 6:
            _context4.next = 8;
            return _this.elementExists(selectors[key]);

          case 8:
            if (_context4.sent) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("return", false);

          case 10:
            _context4.next = 2;
            break;

          case 12:
            return _context4.abrupt("return", true);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  }));
  this.selfie = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // logger.info("Page.selfie()");
            _page2.default.info("Taking page screenshot...");
            _context5.next = 3;
            return _this.load();

          case 3:
            _context5.next = 5;
            return _this.driver.takeScreenshot().then(function (img, err) {
              _page2.default.info("Image base64 first 100 chars: " + img.substr(0, 100));
              _fs2.default.writeFile("./storage/Lazada/screenshots/" + Date.now() + ".png", img, "base64", function (err) {
                return _page2.default.info("FileSystem Callback: ", err);
              });
            });

          case 5:
            return _context5.abrupt("return", _context5.sent);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  }));

  this.close = function () {
    _page2.default.info("Closing page...");

    _this.isClosed = true;

    _page2.default.info("Page closed.");
  };

  this.elementExists = function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(selector) {
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              // logger.info("Page.elementExists()");
              _page2.default.debug("Finding HTML element using CSS selector: '" + selector + "'.");

              _context6.next = 3;
              return _this.driver.findElements(_seleniumWebdriver.By.css(selector)).then(function (elems) {
                if (elems.length === 0) {
                  throw new _error.NoSuchElementError("No such element: '" + selector + "'.");
                }

                _page2.default.debug("SUCCESS: Element found.");
                return true;
              }).catch(function (err) {
                _page2.default.debug("FAILED: " + err.message);
                return false;
              });

            case 3:
              return _context6.abrupt("return", _context6.sent);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, _this);
    }));

    return function (_x) {
      return _ref6.apply(this, arguments);
    };
  }();

  this.getElement = function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(name) {
      var selector, callback, options, task;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _this.load();

            case 2:
              selector = _this.elementSelectors[name];

              callback = function () {
                var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(selector) {
                  return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return _this.driver.findElement(_seleniumWebdriver.By.css(selector));

                        case 2:
                          return _context7.abrupt("return", _context7.sent);

                        case 3:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7, _this);
                }));

                return function callback(_x3) {
                  return _ref8.apply(this, arguments);
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

              _context8.next = 8;
              return task.perform(selector).then(function (elem) {
                _page2.default.debug("SUCCESS: Got and return element.");
                return elem;
              }).catch(function (err) {
                _page2.default.error("FAILED: Could not find element using '" + selector + "'.");
                return err;
              });

            case 8:
              return _context8.abrupt("return", _context8.sent);

            case 9:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, _this);
    }));

    return function (_x2) {
      return _ref7.apply(this, arguments);
    };
  }();
};

exports.default = Page;