import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    foodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foods",
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    howMuch: { type: Number, required: true, min: 1, default: 1 },
    ingredients: String,
    note: String,
  },
  { _id: false }
);

const foodOrderSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, index: true },
    totalPrice: { type: Number, required: true, min: 0 },
    items: {
      type: [itemSchema],
      required: true,
      validate: (items) => items.length > 0,
    },
    status: {
      type: String,
      enum: ["pending", "canceled", "delivered"],
      default: "pending",
    },
    location: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const FoodOrder =
  mongoose.models.FoodOrder || mongoose.model("FoodOrder", foodOrderSchema);
