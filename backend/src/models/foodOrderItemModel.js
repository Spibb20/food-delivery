import { Schema, model } from "mongoose";

const foodOrderItemSchema = new Schema({
  food: { type: Schema.Types.ObjectId, ref: "Food" },
  quantity: { type: Number },
});

export const FoodOrderItem = model("FoodOrderItem", foodOrderItemSchema);
