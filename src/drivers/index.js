import { Builder, Capabilities } from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome";

const screen = {
  width: 1366,
  height: 768
};

console.log("Initializing driver...");

const Driver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .setChromeOptions(new Chrome.Options().headless().windowSize(screen))
  .build();

export default Driver;
