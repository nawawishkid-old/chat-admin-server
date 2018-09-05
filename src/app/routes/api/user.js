import db from "~/src/app/modules/db";
import User from "~/src/app/models/User";

db.connect();

export const get = {
  method: "get",
  path: "/user",
  handler: async (req, res) => {}
};

export const create = {
  method: "post",
  path: "",
  handler: async (req, res) => {
    res.json({
      msg: "created"
    });
  }
};

export const update = {
  method: "post",
  path: "",
  handler: async (req, res) => {}
};

export default { create };
