import Task from "~/src/app/modules/task/Task";

const getLoadUrlTask = (driver, url) => {
  return new Task({
    title: "Load URL",
    callback: async (task, driver, url) => {
      await driver.get(url);
    },
    arguments: [driver, url]
  });
};

export default getLoadUrlTask;
