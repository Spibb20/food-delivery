import { Router } from "express";
import {
  createFoodCategory,
  deleteFoodCategory,
  getFoodCategory,
  updateFoodCategory,
} from "../controller/foodCategoryController.js";

const categoryRouter = Router();

categoryRouter
  .post("/", createFoodCategory)
  .get("/", getFoodCategory)
  .patch("/:categoryID", updateFoodCategory)
  .delete("/:categoryID", deleteFoodCategory);

export default categoryRouter;
