const { Router } = require("express");
const ctrl = require("../../controllers/templateParser");
const {
  withAuth,
  withRequestBodyFilter,
  withCreatorId,
  connectDB
} = require("../../middlewares");


const templateParserRouter = Router();

// Get
// templateParserRouter.get("/", ctrl.get);
templateParserRouter.get("/:templateId", ctrl.get);

// Create
// templateParserRouter.post("/new",  ctrl.create);

// // Update
// templateParserRouter.post("/update/:id",  ctrl.update);

// // Delete
// templateParserRouter.post("/delete/:id",  ctrl.delete);

module.exports = templateParserRouter;
