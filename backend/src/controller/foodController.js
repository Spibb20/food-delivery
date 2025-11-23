import { FoodCategory } from "../models/foodCategoryModel.js";
import { Food } from "../models/foodModel.js";

function parseFood(body) {
  return {
    food: String(body.food || "").trim(),
    price: Number(body.price),
    image: String(body.image || "").trim(),
    ingredients: String(body.ingredients || "").trim(),
    category: body.category,
  };
}
function validateFood(data) {
  if (
    !data.food ||
    !data.image ||
    !data.ingredients ||
    !data.category ||
    !Number.isFinite(data.price) ||
    data.price < 0
  ) {
    return "food, price, image, ingredients and category are required";
  }
}
export async function getFood(_req, res, next) {
  try {
    return res.json(
      await Food.find().populate("category").sort({ createdAt: -1 })
    );
  } catch (e) {
    return next(e);
  }
}
export async function createFood(req, res, next) {
  try {
    const data = parseFood(req.body);
    const error = validateFood(data);
    if (error) return res.status(400).json({ message: error });
    if (!(await FoodCategory.exists({ _id: data.category })))
      return res.status(404).json({ message: "Category not found" });
    const food = await Food.create(data);
    await food.populate("category");
    return res.status(201).json(food);
  } catch (e) {
    return next(e);
  }
}
export async function updateFood(req, res, next) {
  try {
    const data = parseFood(req.body);
    const error = validateFood(data);
    if (error) return res.status(400).json({ message: error });
    if (!(await FoodCategory.exists({ _id: data.category })))
      return res.status(404).json({ message: "Category not found" });
    const updated = await Food.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).populate("category");
    if (!updated) return res.status(404).json({ message: "Food not found" });
    return res.json(updated);
  } catch (e) {
    return next(e);
  }
}
export async function deleteFood(req, res, next) {
  try {
    const deleted = await Food.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Food not found" });
    return res.json({ message: "Food deleted", food: deleted });
  } catch (e) {
    return next(e);
  }
}
