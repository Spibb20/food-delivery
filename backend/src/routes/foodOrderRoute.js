import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import {
  createFoodOrder,
  getAllFoodOrders,
  getMyFoodOrders,
  updateFoodOrderStatus,
  deleteFoodOrder,
} from "../controller/foodOrderController.js";

const orderRouter = Router();

orderRouter.post("/", auth, createFoodOrder);
orderRouter.get("/", auth, getAllFoodOrders);
orderRouter.get("/my", auth, getMyFoodOrders);
orderRouter.patch("/:foodOrderId", auth, updateFoodOrderStatus);
orderRouter.delete("/:foodOrderId", auth, deleteFoodOrder);

export default orderRouter;
