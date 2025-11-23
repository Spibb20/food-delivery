import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    food: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true, trim: true },
    ingredients: { type: String, required: true, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

export const Food =
  mongoose.models.foods || mongoose.model("foods", foodSchema);
