import { Router } from "express";
import {
  createFoodOrder,
  deleteFoodOrder,
  getAllFoodOrders,
  getFoodOrdersByUser,
  updateFoodOrder,
} from "../controller/foodOrderController.js";
import {
  requireAdmin,
  requireSelfOrAdmin,
  requireUser,
} from "../middleware/auth.js";
const router = Router();
router.post("/", requireUser, createFoodOrder);
router.get("/", requireAdmin, getAllFoodOrders);
router.get("/user/:userId", requireSelfOrAdmin, getFoodOrdersByUser);
router.patch("/:id", requireAdmin, updateFoodOrder);
router.delete("/:id", requireAdmin, deleteFoodOrder);
export default router;
