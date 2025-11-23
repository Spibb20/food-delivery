import { FoodCategory } from "../models/foodCategoryModel.js";
import { Food } from "../models/foodModel.js";

export async function getFoodCategory(_req, res, next) {
  try {
    return res.json(await FoodCategory.find().sort({ createdAt: 1 }));
  } catch (e) {
    return next(e);
  }
}
export async function createFoodCategory(req, res, next) {
  try {
    const category = String(req.body.category || "").trim();
    if (!category)
      return res.status(400).json({ message: "Category name is required" });
    return res.status(201).json(await FoodCategory.create({ category }));
  } catch (e) {
    if (e?.code === 11000)
      return res.status(409).json({ message: "Category already exists" });
    return next(e);
  }
}
export async function updateFoodCategory(req, res, next) {
  try {
    const category = String(req.body.category || "").trim();
    if (!category)
      return res.status(400).json({ message: "Category name is required" });
    const updated = await FoodCategory.findByIdAndUpdate(
      req.params.id,
      { category },
      { new: true, runValidators: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Category not found" });
    return res.json(updated);
  } catch (e) {
    return next(e);
  }
}
export async function deleteFoodCategory(req, res, next) {
  try {
    const inUse = await Food.exists({ category: req.params.id });
    if (inUse)
      return res
        .status(409)
        .json({ message: "Delete or move foods in this category first" });
    const deleted = await FoodCategory.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    return res.json({ message: "Category deleted", category: deleted });
  } catch (e) {
    return next(e);
  }
}
