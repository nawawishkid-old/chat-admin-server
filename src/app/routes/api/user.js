import db from "~/src/app/modules/db";
import { Router } from "express";
import ctrl from "~/src/app/controllers/user";
import authMiddleware from "../../middlewares/auth";
import filterRequestBody from "../../middlewares/filterRequestBody";

db.connect();

const router = Router();

// Get
router.get("/:id", authMiddleware, ctrl.get); // tested

// Create
router.post("/", ctrl.create); // tested

// Update
router.post("/update/:id", authMiddleware, ctrl.update); // tested
router.put("/:id", authMiddleware, ctrl.update); // tested
router.patch(
  "/:id",
  authMiddleware,
  filterRequestBody("username", "password", "email", "name"),
  ctrl.update
); // tested

// Delete
router.post("/delete/:id", authMiddleware, ctrl.delete); // tested
router.delete("/:id", authMiddleware, ctrl.delete); // tested

export default router;
