import { Router } from "express";
import {
  deleteFood,
  getFood,
  updateFood,
} from "../controller/foodController.js";

export const foodRouter = Router();

foodRouter
  .get("/", getFood)
  .patch("/:foodID", updateFood)
  .delete("/:foodID", deleteFood);
