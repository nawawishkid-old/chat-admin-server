import { By, until } from "selenium-webdriver";
import logger from "~/src/app/modules/logger/page";

/**
 * Should write Input class for managing sendKeys() of click() for HTML Form Elements' state such as onError
 */
class Page {
  constructor(driver, url, selectors) {
    this.driver = driver;
    this.url = url;
    this.selectors = {
      waitElement: undefined,
      ...selectors
    };
  }

  /**
   * Load page.
   */
  load = async errorMsg => {
    let currentUrl = await this.driver.getCurrentUrl();

    if (currentUrl === this.url) {
      logger.info("Page has already loaded.");
      return;
    }

    logger.info(`Loading page: ${this.url}`);

    await this.driver.get(this.url);
    currentUrl = await this.driver.getCurrentUrl();

    if (currentUrl !== this.url) {
      throw new Error(`The page has been redirected to ${currentUrl}`);
    }

    const waitElement =
      this.selectors.waitElement || this._getDefinedSelector();

    try {
      await this.driver.wait(until.elementLocated(By.css(waitElement)), 10000);
    } catch (e) {
      const msg = errorMsg || e.message;

      logger.error(msg);

      return false;
    }

    return true;
  };

  /**
   * ===== Private helper methods =====
   */
  _getTextAndSetInfo = async (selectorKey, infoKey, callback = x => x) => {
    const result = callback(
      await (await this._find("css", selectorKey)).getText()
    );

    // console.log(`_getText: ${infoKey}: ${result}`);

    this.info[infoKey] = result;

    return result;
  };

  /**
   * Selenium's getText() wrapper.
   *
   * @param {String} selectorKey Key of the page's selector object.
   * @param {Function} getter Callback for mutating received element's text.
   * @returns {*} Received element's text.
   */
  _getText = async (selectorKey, getter = text => text) => {
    return getter(await (await this._find("css", selectorKey)).getText());
  };

  /**
   * Selenium's sendKeys() wrapper.
   *
   * @param {String} selectorKey Key of the page's selector object.
   * @param {String} data Data to be sent to the targeted element.
   * @param {Boolean} shouldClear Whether to clear the targeted element's value before sending keys or not.
   */
  _key = async (selectorKey, data, shouldClear = true) => {
    // logger.debug(`_key(${selectorKey},${data},${shouldClear})`);
    const input = await this._find("css", selectorKey);

    // console.log("input: ", input);
    // console.log(
    //   "selectorKey: ",
    //   selectorKey,
    //   "data: ",
    //   data,
    //   "shouldClear: ",
    //   shouldClear
    // );

    if (shouldClear) {
      await input.clear();
    }

    // console.log("input: ", input);
    // console.log("DATA: ", data);

    return await input.sendKeys(data);
  };

  /**
   * Selenium's click() wrapper.
   *
   * @uses Page._find()
   * @param {String} selectorKey Key of the page's selector object.
   * @param {String} method Selenium's locator (By) method to be used.
   * @param {Function} getter Callback for mutating page's selector value.
   */
  _click = async (
    selectorKey,
    method = "css",
    getter = (key, selector) => selector
  ) => {
    const elem = await this._find(method, selectorKey, getter);

    return elem.click();
  };

  _getElem = selector => {
    // return Promise
    return this._find("css", selector);
  };

  /**
   * Selenium's findElement() wrapper. I should swap the order of parameters, `selectorKey` comes first.
   *
   * @param {String} method Selenium's locator (By) method to be used.
   * @param {String} selectorKey Key of the page's selector object.
   * @param {Function} getter Callback for mutating page's selector value.
   */
  _find = async (method, selectorKey, getter = (key, selector) => selector) => {
    let selector = this.selectors;

    // console.log("selectorKey: ", selectorKey);

    if (selectorKey.indexOf(".")) {
      selectorKey.split(".").forEach(value => (selector = selector[value]));
    } else {
      selector = this.selectors[selectorKey];
    }

    // console.log("1st selector: ", selector);

    selector = getter(selectorKey, selector);

    // return Promise
    // console.log("selector: ", selector);
    return this.driver.findElement(By[method](selector));
  };

  _getDefinedSelector = () => {
    for (let key in this.selectors) {
      if (this.selectors[key]) {
        return this.selectors[key];
      }
    }

    throw new Error("Error: No selectors given.");
  };

  /**
   * For XPath selector with dynamic modifier.
   */
  _generateXPath = (key, modifier) => {
    return this.selectors.xPath[key].replace("%s", modifier);
  };
}

export default Page;
