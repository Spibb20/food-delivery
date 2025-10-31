import { Schema, model } from "mongoose";

const foodCategorySchema = new Schema(
  {
    categoryName: { type: String },
  },
  { timestamps: true }
);

export const FoodCategory = model("FoodCategory", foodCategorySchema);
