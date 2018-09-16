import { Router } from "express";
import ctrl from "~/src/app/controllers/template";
import authMiddleware from "../middlewares/auth";
import attachCreatorId from "~/src/app/middlewares/attachCreatorId";

const router = Router();

// Get
router.get("/:id?", authMiddleware, attachCreatorId, ctrl.get); // tested

// Create
router.post("/", authMiddleware, attachCreatorId, ctrl.create); // tested

// Update
router.post("/update/:id", authMiddleware, attachCreatorId, ctrl.update);
router.put("/:id", authMiddleware, attachCreatorId, ctrl.update);
router.patch("/:id", authMiddleware, attachCreatorId, ctrl.update);

// Delete
router.post("/delete/:id", authMiddleware, attachCreatorId, ctrl.delete);
router.delete("/:id", authMiddleware, attachCreatorId, ctrl.delete);

export default router;
