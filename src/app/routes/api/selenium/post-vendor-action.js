import vendor from "~/src/app/vendors/index";
import { getDriver } from "~/src/app/modules/selenium/index";
import logger from "~/src/app/modules/logger/api";
import apiPath from "~/src/app/routes/constants";
import Pipeline from "~/src/app/modules/task/Pipeline";

export default {
  method: "POST",
  path: apiPath.API_SELENIUM_POST_VENDOR_ACTION,
  handler: async (req, h) => {
    // loggergetI("()vendor: ");
    logger.debug("payload: " + req.payload);
    // logger.debug(`payload: ${req.payload}`);
    logger.debug("query params: " + JSON.stringify(req.query));
    logger.debug("path params: " + JSON.stringify(req.params));
    // process.exit();
    // return h.response("ok");

    const data =
      typeof req.payload === "string" ? JSON.parse(req.payload) : req.payload;
    const theVendor = vendor[req.params.vendor];
    const driver = getDriver();
    const actions = req.query.actions
      .split(",")
      .map(action => theVendor[action]); // (driver, data));
    // const pipelines = [];
    const p = new Pipeline();

    p.setInfo("order", {});

    for (let i = 0; i < actions.length; i++) {
      // pipelines.push(await actions[i](driver, data));
      p.add(async (ctx, next) => {
        const pipeline = await actions[i](driver, data);

        p.setInfo("order", pipeline.getInfo().order, true);

        if (pipeline.getInfo().taskBoxes.failed.length > 0) {
          throw new Error("Error: Pipeline failed!");
        }

        next();
      });
    }

    const pipelines = await p.perform();

    logger.debug("Driver quitting.");
    driver.quit();

    return h
      .response(JSON.stringify(pipelines))
      .header("Access-Control-Allow-Origin", "*")
      .code(200);
  }
};
