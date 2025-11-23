import { Router } from "express";
import {
  createFoodCategory,
  deleteFoodCategory,
  getFoodCategory,
  updateFoodCategory,
} from "../controller/foodCategoryController.js";
import { requireAdmin } from "../middleware/auth.js";
const router = Router();
router.get("/", getFoodCategory);
router.post("/", requireAdmin, createFoodCategory);
router.patch("/:id", requireAdmin, updateFoodCategory);
router.delete("/:id", requireAdmin, deleteFoodCategory);
export default router;
