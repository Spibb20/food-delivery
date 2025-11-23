import { Food } from "../models/foodModel.js";
import { FoodOrder } from "../models/foodOrderModel.js";

export async function createFoodOrder(req, res, next) {
  try {
    const incomingItems = Array.isArray(req.body.items) ? req.body.items : [];
    const location = String(req.body.location || "").trim();
    if (!incomingItems.length)
      return res
        .status(400)
        .json({ message: "Order must contain at least one item" });
    if (!location)
      return res.status(400).json({ message: "Delivery location is required" });
    const items = [];
    let totalPrice = 0;
    for (const item of incomingItems) {
      const food = await Food.findById(item.foodId);
      if (!food) return res.status(404).json({ message: "Food not found" });
      const howMuch = Math.max(1, Number.parseInt(item.howMuch, 10) || 1);
      items.push({
        foodId: food._id,
        name: food.food,
        price: food.price,
        howMuch,
        ingredients: food.ingredients,
        note: item.note,
      });
      totalPrice += food.price * howMuch;
    }
    const order = await FoodOrder.create({
      user: req.authUserId,
      items,
      totalPrice,
      status: "pending",
      location,
    });
    await order.populate("items.foodId");
    return res.status(201).json(order);
  } catch (e) {
    return next(e);
  }
}
export async function getAllFoodOrders(_req, res, next) {
  try {
    return res.json(
      await FoodOrder.find().populate("items.foodId").sort({ createdAt: -1 })
    );
  } catch (e) {
    return next(e);
  }
}
export async function getFoodOrdersByUser(req, res, next) {
  try {
    return res.json(
      await FoodOrder.find({ user: req.params.userId })
        .populate("items.foodId")
        .sort({ createdAt: -1 })
    );
  } catch (e) {
    return next(e);
  }
}
export async function updateFoodOrder(req, res, next) {
  try {
    if (!["pending", "canceled", "delivered"].includes(req.body.status))
      return res.status(400).json({ message: "Invalid order status" });
    const updated = await FoodOrder.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    ).populate("items.foodId");
    if (!updated) return res.status(404).json({ message: "Order not found" });
    return res.json(updated);
  } catch (e) {
    return next(e);
  }
}
export async function deleteFoodOrder(req, res, next) {
  try {
    const deleted = await FoodOrder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Order not found" });
    return res.json({ message: "Order deleted", order: deleted });
  } catch (e) {
    return next(e);
  }
}
