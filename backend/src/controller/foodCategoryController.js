import { FoodCategory } from "../models/foodCategoryModel.js";

export const createFoodCategory = async (req, res) => {
  try {
    const { body } = req;
    const foodCategory = await FoodCategory.create(body);
    res.status(200).send({ message: "Success!", data: foodCategory });
  } catch (error) {
    res.status(500).send({ message: "Error", data: null });
  }
};

export const getFoodCategory = async (req, res) => {
  try {
    const { body } = req;
    const foodCategory = await FoodCategory.find(body);
    res.status(200).send({ message: "Success!", data: foodCategory });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

export const updateFoodCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;

    const updatedData = req.body;

    const foodCategory = await FoodCategory.findByIdAndUpdate(
      categoryID,
      updatedData
    );
    res.status(200).send({ message: "Success!", data: foodCategory });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

export const deleteFoodCategory = async (req, res) => {
  try {
    const categoryID = req.params.id;

    await FoodCategory.findByIdAndDelete(categoryID);

    return res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category", error);
    return res.status(500).send({ message: "Server error", error });
  }
};
