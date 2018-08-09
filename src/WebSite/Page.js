import { ThenableWebDriver, By } from "selenium-webdriver";
import { IncompatibleException } from "~/src/Exception/index";

class Page {
  /**
   * @prop {ThenableWebDriver} driver Selenium webdriver instance.
   */
  driver;

  /**
   * @prop {String} name Name of the page.
   */
  name;

  /**
   * @prop {String} url The page's url.
   */
  url;

  /**
   * @prop {String{}} elementSelectors Object of CSS Selector of all HTML elements needed to operate the page's actions.
   */
  elementSelectors = {};

  /**
   * @prop {Boolean} isLoaded Is page loaded?
   */
  isLoaded = false;

  /**
   * @prop {Boolean} isClosed Is page active?
   */
  isClosed = true;

  /**
   * @prop {Boolean} isInit Is page initialized?
   */
  isInit = false;

  /**
   *
   * @param {ThenableWebDriver} driver Selenium webdriver instance.
   * @return void
   */
  constructor(driver, name, url) {
    this.name = name;
    this.url = url;
    this.driver = driver;
  }

  load = async () => {
    if (this.init && this.isClosed) {
      console.log("Page has already closed, no driver to return.");
      return;
    }

    if (this.isLoaded) {
      console.log("Page has already loaded, return the driver");
      return this.driver;
    }

    this.isClosed = false;
    this.init = true;

    console.log("Loding page...");

    return await this.driver
      .get(this.url)
      .then(() => {
        console.log("Page loaded.");
        this.isLoaded = true;
        this.checkCompatibility();
      })
      .catch(err => console.log("Failed to get page!", err));
  };

  /**
   * Check if the HTML of the page still valid.
   */
  checkCompatibility = () => {
    console.log("Checking HTML compatibility...");

    try {
      // console.log('isCompatible: ', this.isCompatible());
      if (!this.isCompatible()) {
        throw new IncompatibleException(
          `The page '${this.name}' is incompatible with your code.`
        );
      }
    } catch (error) {
      console.log("This is error: ", error);

      this.close();
    }

    console.log("Page is compatible.");
    console.log("Start performing page's action...");

    return true;
  };

  isCompatible = () => {
    return Object.values(this.elementSelectors).every(this.elementExists);
  };

  selfie = () => {
    return this.load().takeScreenshot();
  };

  close = () => {
    console.log("Closing page...");

    this.isClosed = true;

    console.log("Page closed.");
  };

  elementExists = async selector => {
    return await this.load()
      .findElements(By.css(selector))
      .then(() => true)
      .catch(() => false);
  };

  getElement = async name => {
    const driver = await this.load();
    console.log("Driver: ", driver);
    return driver
      .findElements(By.css(this.elementSelectors[name]))
      .catch(() => console.log("Error: could not find element"));
  };
}

export default Page;
