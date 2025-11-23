import { Router } from "express";
import {
  createFood,
  deleteFood,
  getFood,
  updateFood,
} from "../controller/foodController.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
router.get("/", getFood);
router.post("/", requireAdmin, createFood);
router.patch("/:id", requireAdmin, updateFood);
router.delete("/:id", requireAdmin, deleteFood);
export default router;
