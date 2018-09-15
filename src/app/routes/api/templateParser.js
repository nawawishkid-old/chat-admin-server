// import db from "~/src/app/modules/db";
import { Router } from "express";
import ctrl from "~/src/app/controllers/templateParser";
import authMiddleware from "../middlewares/auth";

// db.connect();

const router = Router();

// Get
// router.get("/", ctrl.get);
router.get("/:templateId", authMiddleware, ctrl.get);

// Create
// router.post("/new", authMiddleware, ctrl.create);

// // Update
// router.post("/update/:id", authMiddleware, ctrl.update);

// // Delete
// router.post("/delete/:id", authMiddleware, ctrl.delete);

export default router;
