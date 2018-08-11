"use strict";

require("babel-polyfill");

var _index = require("./drivers/index");

var _index2 = _interopRequireDefault(_index);

var _index3 = require("./websites/Lazada/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import "./Task/index";

// console.log(Lazada);

// import './selenium/index';
var Lazada = new _index3.Lazada(_index2.default);
// Lazada.addDriver(Driver);
Lazada.signUp("Nawawish Samerpark", "nawawish@bitalamail.com", "sometingwong555").then(function () {
  console.log("Driver.quit()");
  _index2.default.quit();
});

// Driver.quit();