"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WebSite =
/**
 *
 * @param {*} driver Selenium webdriver Builder instance
 * @param {String} domain Web domain name e.g. google.com, socket.io, www.lazada.co.th
 */
function WebSite(driver) {
  var _this = this;

  _classCallCheck(this, WebSite);

  this.quit = function () {
    _this.driver.quit();
  };

  this.driver = driver;
  // this.domain = domain;
  this.pages = {};
};

exports.default = WebSite;