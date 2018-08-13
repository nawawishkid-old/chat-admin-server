import Task from "./Task2";
import { By } from "selenium-webdriver";
import logger from "~/src/Logger/task";

const callback = async (task, driver) => {
  const info = task.info;
  await driver.findElement(By.css(info.selector))[info.action](info.input);
  // elem is Selenium's WebElement instance.
  // const elem = await driver.findElement(By.css(info.selector)).then(elem => {
  //   task.logger("debug", "Element found.");
  //   return elem;
  // });
  // // .catch(err => {
  // //   console.log(err.message);
  // //   return null;
  // // });

  // // WebElement.sendKeys() or .click()
  // await elem[info.action](info.input).then(() => {
  //   task.logger("debug", `Element do '${info.action}' successfully.`);
  // });
};

const getDomInteractionTask = (driver, info, options = {}) => {
  const newInfo = {
    callback: callback,
    arguments: [driver],
    ...info
  };

  return new Task(newInfo, options);
};

export default getDomInteractionTask;
