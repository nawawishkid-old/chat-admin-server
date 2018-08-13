import Task from "~/src/Task/Task2";
import fs from "fs";

const selfieCallback = async (task, driver, filename) => {
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

const getSelfieTask = (driver, filename) => {
  return new Task({
    title: "Selfie",
    callback: selfieCallback,
    arguments: [driver, filename]
  });
};

export default getSelfieTask;
