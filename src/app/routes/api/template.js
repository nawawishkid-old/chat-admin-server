import { Router } from "express";
import ctrl from "~/src/app/controllers/template";
import authMiddleware from "../middlewares/auth";

const router = Router();

// Get
router.get("/:id?", authMiddleware, ctrl.get); // tested

// Create
router.post("/", authMiddleware, ctrl.create); // tested

// Update
router.post("/update/:id", authMiddleware, ctrl.update);
router.put("/:id", authMiddleware, ctrl.update);
router.patch("/:id", authMiddleware, ctrl.update);

// Delete
router.post("/delete/:id", authMiddleware, ctrl.delete);
router.delete("/:id", authMiddleware, ctrl.delete);

export default router;
