import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"] },
    orderedFoods: { type: [Schema.ObjectId] },
    ttl: { type: Date },
    isVerified: { type: Boolean },
  },
  { timestamps: true }
);

export const User = model("user", userSchema);
