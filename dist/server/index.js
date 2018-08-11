"use strict";

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _router = require("router");

var _router2 = _interopRequireDefault(_router);

var _finalhandler = require("finalhandler");

var _finalhandler2 = _interopRequireDefault(_finalhandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _router2.default)();
var server = _http2.default.createServer();

router.get("/", function (req, res) {
  res.setHeader("content-type", "text/html");
  res.end("<h4>Hello, world</h4>");
});

server.on("request", function (req, res) {
  console.log(req.method.toUpperCase() + " " + req.url);
  router(req, res, (0, _finalhandler2.default)(req, res));
});

server.listen(11112);