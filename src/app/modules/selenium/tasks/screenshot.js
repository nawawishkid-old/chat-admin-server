import Task from "~/src/app/modules/task/Task";
import fs from "fs";

const screenshotCallback = async (task, driver, filename) => {
  await driver.takeScreenshot().then((img, err) => {
    task.logger("debug", `Image base64 first 100 chars: ${img.substr(0, 100)}`);
    fs.writeFile(filename, img, "base64", err => {
      if (err) {
        throw err;
        // task.logger("error", err.message);
      }
    });
  });
};

const getScreenshotTask = (driver, filename) => {
  return new Task({
    title: "Screenshot",
    callback: screenshotCallback,
    arguments: [driver, filename]
  });
};

export default getScreenshotTask;
