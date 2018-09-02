import Task from "~/src/app/modules/task/Task";
import { By } from "selenium-webdriver";

const callback = async (task, driver) => {
  const info = task.info;
  await driver.findElement(By.css(info.selector))[info.action](info.input);
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
