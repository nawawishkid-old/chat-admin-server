import Task from "~/src/Task/Task2";

const getLoadUrlTask = (driver, url) => {
  return new Task({
    title: "Request page",
    callback: async (task, driver, url) => {
      await driver.get(url);
    },
    arguments: [driver, url]
  });
};

export default getLoadUrlTask;
