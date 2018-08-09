import { Builder, By, Capabilities, until } from 'selenium-webdriver';
import Chrome from 'selenium-webdriver/chrome';

const url = 'https://member.lazada.co.th/user/login';
const screen = {
	width: 1366,
	height: 768
}

const Driver = new Builder()
			.withCapabilities(Capabilities.chrome())
			.setChromeOptions(new Chrome.Options().headless().windowSize(screen))
			.build();

test('can load a webpage', () => {
  return Driver.get(url)
								.then(done =>  {
									console.log('loaded!');
									done();
								});
})