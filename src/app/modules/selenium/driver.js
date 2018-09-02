import { Builder, Capabilities } from "selenium-webdriver";
import Chrome from "selenium-webdriver/chrome";

const screen = {
  width: 1366,
  height: 768
};

const getDriver = () => {
  console.log("Initializing driver...");

  return (
    new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(new Chrome.Options().windowSize(screen))
      // .setChromeOptions(new Chrome.Options().headless().windowSize(screen))
      .build()
  );
};

export default getDriver;
