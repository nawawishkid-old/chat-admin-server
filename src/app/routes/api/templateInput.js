import { Router } from "express";
import ctrl from "~/src/app/controllers/templateInput";
import authMiddleware from "../middlewares/auth";
import attachCreatorId from "~/src/app/middlewares/attachCreatorId";

// db.connect();

const router = Router();

// Get
router.get("/:id?", authMiddleware, attachCreatorId, ctrl.get);

// Create
router.post("/", authMiddleware, attachCreatorId, ctrl.create);

// Update
router.post("/update/:id", authMiddleware, attachCreatorId, ctrl.update);
router.put("/:id", authMiddleware, attachCreatorId, ctrl.update);
router.patch("/:id", authMiddleware, attachCreatorId, ctrl.update);

// Delete
router.post("/delete/:id", authMiddleware, attachCreatorId, ctrl.delete);
router.delete("/:id", authMiddleware, attachCreatorId, ctrl.delete);

export default router;
