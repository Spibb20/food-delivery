import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    orderedFoods: { type: Schema.Types.ObjectId, ref: "FoodOrder" },
    ttl: { type: Date },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model("User", userSchema);
