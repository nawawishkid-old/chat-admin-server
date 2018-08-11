import { ThenableWebDriver, By } from "selenium-webdriver";
import { IncompatibleException } from "~/src/Exception/index";
import Task from "~/src/Task/Task";
import fs from "fs";
import logger from "~/src/Logger/index";
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
      findElement: tasks.findElement
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
      .then(() => {
        logger.info("Page loaded.");
        this.isLoaded = true;
        this.checkCompatibility();
      })
      .catch(err => {
        logger.info(`FAILD: Could not get page from given url:${this.url}`);
        return err;
      });
  };

  /**
   * Check if the HTML of the page still valid.
   */
  checkCompatibility = () => {
    logger.info("Checking HTML compatibility...");

    try {
      // logger.info('isCompatible: ', this.isCompatible());
      if (!this.isCompatible()) {
        throw new IncompatibleException(
          `The page '${this.name}' is incompatible with your code.`
        );
      }
    } catch (error) {
      logger.info("This is error: ", error);

      this.close();
    }

    logger.info("Page is compatible.");
    logger.info("Start performing page's action...");

    return true;
  };

  isCompatible = () => {
    // logger.info("Page.isCompatible()");
    return Object.values(this.elementSelectors).every(async selector => {
      return await this.elementExists(selector);
    });
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
      .then(() => {
        logger.debug("SUCCESS: Element found.");
        return true;
      })
      .catch(() => {
        logger.debug("FAILED: Element not found.");
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
