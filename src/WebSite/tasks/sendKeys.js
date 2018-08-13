import Task from "~/src/Task/Task";
import findElement from "./findElement";
import logger from "~/src/Logger/index";

const sendKeysTask = new Task(async (elem, value) => {
  return await elem.sendKeys(value);
});

sendKeysTask.on("success", (task, result) => {
  task.logger("info", "Input filled.");
});

sendKeysTask.on("failed", (task, err) => {
  task.logger("error", `Could not fill input: ${err.message}`);
});

sendKeysTask.config({
  title: "sendKeysTask"
});

const task = new Task(async (driver, selector, value) => {
  logger.debug("Performing sendKeys...");

  findElement.on("success", async elem => {
    logger.info("Filling input");
    // await sendKeysTask.perform(elem, value);
  });

  findElement.on("failed", err => logger.error("Failed naja", err.message));

  const elem = await findElement.perform(driver, selector);

  return await sendKeysTask.perform(elem, value);
});

export default sendKeysTask;
