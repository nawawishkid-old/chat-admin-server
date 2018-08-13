"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

require("babel-polyfill");

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _router = require("router");

var _router2 = _interopRequireDefault(_router);

var _finalhandler = require("finalhandler");

var _finalhandler2 = _interopRequireDefault(_finalhandler);

var _signup = require("../api/Lazada/signup");

var _signup2 = _interopRequireDefault(_signup);

var _querystring = require("querystring");

var _index = require("../drivers/index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _router2.default)();
var server = _http2.default.createServer();

router.get("/", function (req, res) {
  res.setHeader("content-type", "text/html");
  res.end("<h4>Hello, world</h4>");
});
router.post("/Lazada/signup", function (req, res) {
  var body = "";

  req.on("data", function (chunk) {
    body += chunk.toString();
  });

  req.on("end", function () {
    var data = (0, _querystring.parse)(body);
    console.log("raw: ", body);
    console.log(data);
    console.log("typeof: ", typeof data === "undefined" ? "undefined" : _typeof(data));
    var pipeline = (0, _signup2.default)(_index2.default, "https://member.lazada.co.th/user/register", {
      fullName: data.fullName,
      email: data.email,
      password: data.password
    });

    pipeline.perform().then(function (result) {
      console.log("SUCCESS!");
      res.end("ok");
    }).catch(function (err) {
      return console.log(err.message);
    });
  });

  // console.log(req);
});

server.on("request", function (req, res) {
  console.log(req.method.toUpperCase() + " " + req.url);
  router(req, res, (0, _finalhandler2.default)(req, res));
});

server.listen(11112);