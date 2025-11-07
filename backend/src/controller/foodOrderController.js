import { FoodOrder } from "../models/foodOrderModel.js";

export const createFoodOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { foodOrderItems } = req.body;

    let totalPrice = 0;

    for (const item of foodOrderItems) {
      const food = await Food.findById(item.food);
      if (!food) return res.status(404).send({ message: "Food not found" });

      totalPrice += food.price * item.quantity;
    }

    const newOrder = await FoodOrder.create({
      user: userId,
      foodOrderItems,
      totalPrice,
    });

    res.status(201).send({ message: "Order created", data: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Server error" });
  }
};

export const getAllFoodOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find()
      .populate("user", "email phoneNumber")
      .populate("foodOrderItems.food", "foodName price image");
    res.status(200).send({ message: "Success", data: orders });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const getMyFoodOrders = async (req, res) => {
  try {
    const userId = req.user.userId;

    const orders = await FoodOrder.find({ user: userId }).populate(
      "foodOrderItems.food",
      "foodName price image"
    );

    res.status(200).send({ message: "Success", data: orders });
  } catch {
    res.status(500).send({ message: "Error" });
  }
};

export const updateFoodOrderStatus = async (req, res) => {
  try {
    const { foodOrderId } = req.params;
    const { status } = req.body;

    const order = await FoodOrder.findByIdAndUpdate(
      foodOrderId,
      { status },
      { new: true }
    );

    res.status(200).send({ message: "Status updated", data: order });
  } catch {
    res.status(500).send({ message: "Error" });
  }
};

export const deleteFoodOrder = async (req, res) => {
  try {
    const { foodOrderId } = req.params;

    await FoodOrder.findByIdAndDelete(foodOrderId);

    res.status(200).send({ message: "Order deleted" });
  } catch {
    res.status(500).send({ message: "Error" });
  }
};
