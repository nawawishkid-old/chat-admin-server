import getDriver from "./driver";
import domInteractionTask from "./tasks/domInteraction";
import loadUrlTask from "./tasks/loadUrl";
import screenshotTask from "./tasks/screenshot";

const task = {
  domInteractionTask,
  loadUrlTask,
  screenshotTask
};

export default getDriver;

export { getDriver, task };
