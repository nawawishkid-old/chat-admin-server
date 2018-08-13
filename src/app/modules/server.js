import Hapi from "hapi";
import { server as config } from "../config";
import apiRoutes from "../routes/api";

console.log("config: ", config);

const server = Hapi.server({
  host: config.host,
  port: config.port
});

server.route(apiRoutes);

export default server;
