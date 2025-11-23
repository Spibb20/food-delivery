import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

export const FoodCategory =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
