'use strict';

var _seleniumWebdriver = require('selenium-webdriver');

var _chrome = require('selenium-webdriver/chrome');

var _chrome2 = _interopRequireDefault(_chrome);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = 'https://member.lazada.co.th/user/login';
var screen = {
	width: 1366,
	height: 768
};

var Driver = new _seleniumWebdriver.Builder().withCapabilities(_seleniumWebdriver.Capabilities.chrome()).setChromeOptions(new _chrome2.default.Options().headless().windowSize(screen)).build();

test('can load a webpage', function () {
	return Driver.get(url).then(function (done) {
		console.log('loaded!');
		done();
	});
});