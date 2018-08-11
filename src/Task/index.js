import Task from "./Task";
import logger from "~/src/Logger/index";
import fetch from "node-fetch";

const callback = async () => {
  logger.info("Hello, world!");
  return await fetch("https://google.come").then(response =>
    console.log(response)
  );
  // .catch(err => console.log(err));
  // throw Error('This is ERROR!');
};

const options = {
  // retries: 3,
  // retryAfter: 500,
  onFailed: err => {
    logger.error("I'm failed!");
  },
  onSuccess: result => {
    logger.info("I'm success!");
  }
};

const myTask = new Task(callback, options);

myTask.perform();
