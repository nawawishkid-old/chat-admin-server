import { ThenableWebDriver, By } from "selenium-webdriver";
import { NoSuchElementError } from "selenium-webdriver/lib/error";
import { IncompatibleException } from "~/src/Exception/index";
import Task from "~/src/app/modules/task/Task";
import fs from "fs";
import logger from "~/src/Logger/page";
import tasks from "./tasks/index";

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
    this.task = {
      findElement: tasks.findElement,
      sendKeys: tasks.sendKeys
      // ...tasks
    };
  }

  load = async () => {
    // logger.info("Page.load()");
    if (this.init && this.isClosed) {
      // logger.info("Page has already closed, no driver to return.");
      return;
    }

    if (this.isLoaded) {
      // logger.info("Page has already loaded, return the driver");
      return this.driver;
    }

    this.isClosed = false;
    this.init = true;

    logger.info(`Loading page from ${this.url}`);

    return await this.driver
      .get(this.url)
      .then(async () => {
        logger.info("Page loaded.");
        this.isLoaded = true;
        await this.checkCompatibility();
      })
      .catch(err => {
        logger.info(`FAILED: Could not get page from given url:${this.url}`);
        return err;
      });
  };

  /**
   * Check if the HTML of the page still valid.
   */
  checkCompatibility = async () => {
    logger.info("Checking HTML compatibility...");

    const isCompatible = await this.isCompatible();

    // console.log("compat: ", isCompatible);

    try {
      if (!isCompatible) {
        throw new IncompatibleException(
          `The page '${
            this.name
          }' has incompatible HTML structure with given selector.`
        );
      }
    } catch (error) {
      logger.error(error.message);

      this.close();

      return;
    }

    logger.info("Page is compatible.");
    logger.info("Start performing page's action...");

    return true;
  };

  /**
   * Implement Array.prototype.every() on Object asynchronously.
   */
  isCompatible = async () => {
    // logger.info("Page.isCompatible()");
    const selectors = this.elementSelectors;

    for (let key in selectors) {
      if (!selectors.hasOwnProperty(key)) {
        continue;
      }

      if (!(await this.elementExists(selectors[key]))) {
        return false;
      }
    }

    return true;
  };

  selfie = async () => {
    // logger.info("Page.selfie()");
    logger.info("Taking page screenshot...");
    await this.load();

    return await this.driver.takeScreenshot().then((img, err) => {
      logger.info(`Image base64 first 100 chars: ${img.substr(0, 100)}`);
      fs.writeFile(
        `./storage/Lazada/screenshots/${Date.now()}.png`,
        img,
        "base64",
        err => logger.info("FileSystem Callback: ", err)
      );
    });
  };

  close = () => {
    logger.info("Closing page...");

    this.isClosed = true;

    logger.info("Page closed.");
  };

  elementExists = async selector => {
    // logger.info("Page.elementExists()");
    logger.debug(`Finding HTML element using CSS selector: '${selector}'.`);

    return await this.driver
      .findElements(By.css(selector))
      .then(elems => {
        if (elems.length === 0) {
          throw new NoSuchElementError(`No such element: '${selector}'.`);
        }

        logger.debug("SUCCESS: Element found.");
        return true;
      })
      .catch(err => {
        logger.debug(`FAILED: ${err.message}`);
        return false;
      });
  };

  getElement = async name => {
    // logger.info("Page.getElement()");
    await this.load();

    const selector = this.elementSelectors[name];
    const callback = async selector => {
      return await this.driver.findElement(By.css(selector));
      // .then(element => {
      //   logger.debug("SUCCESS: Got and return element.");
      //   return element;
      // })
      // .catch(err => {
      //   logger.error(`FAILED: Could not find element using '${selector}'.`);
      //   return err;
      // });
    };
    const options = {
      retries: 3,
      retryAfter: 2000
      // onSuccess: elem => {
      //   logger.debug("SUCCESS: Got and return element.");
      //   return elem;
      // },
      // onFailed: err => {
      //   logger.error(`FAILED: Could not find element using '${selector}'.`);
      //   return err;
      // }
    };
    const task = new Task(callback, options);

    // task.onSuccess(elem => {
    //   logger.debug("SUCCESS: Got and return element.");
    //   return elem;
    // });

    // task.onFailed(err => {
    //   logger.error(`FAILED: Could not find element using '${selector}'.`);
    //   return err;
    // });

    return await task
      .perform(selector)
      .then(elem => {
        logger.debug("SUCCESS: Got and return element.");
        return elem;
      })
      .catch(err => {
        logger.error(`FAILED: Could not find element using '${selector}'.`);
        return err;
      });

    // return await this.driver
    //   .findElement(By.css(selector))
    //   .then(element => {
    //     logger.debug("SUCCESS: Got and return element.");
    //     return element;
    //   })
    //   .catch(err => {
    //     logger.error(`FAILED: Could not find element using '${selector}'.`);
    //     return err;
    //   });
  };
}

export default Page;
