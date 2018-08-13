import server from "~/src/app/server";
// import app from "../app";
// import vendor from "~/src/app/vendors/index";

const prefix = "/v0";

export default [
  {
    method: "GET",
    path: prefix + "/",
    handler: (req, h) => {
      return "Hapi world!";
    }
  },
  {
    method: "POST",
    path: prefix + "/vendor/{vendor}/method/{method}",
    handler: (req, h) => {
      console.log(req.params);
      return `This is param: ${JSON.stringify(req.params)}`;
    }
  }
];
