import Hapi from "hapi";
import { server as config } from "../config";
import apiRoutes from "../routes/api/index";

const server = Hapi.server({
  host: config.host,
  port: config.port
});

server.route([apiRoutes.seleniumPostVendorAction]);

export default server;
