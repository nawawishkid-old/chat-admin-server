import Hapi from "hapi";
import { server as config } from "../config";
import apiRoutes from "../routes/api/index";
import buyApi from "../routes/buy";

const server = Hapi.server({
  host: config.host,
  port: config.port
});

server.route([apiRoutes.seleniumPostVendorAction, buyApi]);

export default server;
