import { Schema, model } from "mongoose";
import { FoodCategory } from "./foodCategoryModel.js";

const foodSchema = new Schema(
  {
    foodName: { type: String },
    price: { type: Number },
    image: { type: String },
    ingredients: { type: String },
    category: { type: FoodCategory.ObjectId },
  },
  { timestamps: true }
);

export const Food = model("Food", foodSchema);
