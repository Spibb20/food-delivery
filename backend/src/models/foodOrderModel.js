import { Schema, model } from "mongoose";

const foodOrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    totalPrice: { type: Number },
    foodOrderItems: { type: Schema.Types.Array, ref: "FoodOrderItem" },
    status: { type: String, enum: ["PENDING", "CANCELED", "DELIVERED"] },
  },
  { timestamps: true }
);

export const FoodOrder = model("FoodOrderSchema", foodOrderSchema);
