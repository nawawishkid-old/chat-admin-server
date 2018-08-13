import Task from "~/src/Task/Task";
import { ThenableWebDriver, By } from "selenium-webdriver";
import logger from "~/src/Logger/index";

// const findElement = (driver, selector) => {
const task = new Task(async (driver, selector) => {
  return await driver.findElement(By.css(selector));
});

// task.config({
task.on("success", (task, elem) => {
  task.logger("info", "Element found.");
  return elem;
});

task.on("failed", (task, err) => {
  task.logger("error", err.message);
  // if (task.options.alwaysThrow) {
  //   throw err;
  // }
});
// });

task.config({
  title: "findElement"
  // retry: 3
});

// task.perform(selector)
//   .then(elem => {
//     logger.info("Element found.");
//     return elem;
//   })
//   .catch(err => {
//     logger.error("Element not found.");
//   });

//   return await task;
// };

// console.log('TASK: ', task);
// console.log("config: ", typeof task.config);

export default task;
