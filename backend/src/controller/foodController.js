import { Food } from "../models/foodModel.js";

export const getFood = async (req, res) => {
  try {
    const foodID = req.params.id;
    const food = await Food.findById(foodID);

    res.status(200).send({ message: "Success!", data: food });
  } catch (error) {
    res.status(500).send({ message: "Server error" });
  }
};

export const updateFood = async (req, res) => {
  try {
    const foodID = req.params.id;

    const updatedData = req.body;

    const food = await Food.findByIdAndUpdate(foodID, updatedData);
    res.status(200).send({ message: "Success!", data: food });
  } catch (error) {
    res.status(500).send({ message: "Error" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const foodID = req.params.id;

    const food = await Food.findByIdAndDelete(foodID);

    if (!food) {
      return res.status(404).send({ message: "Food not found" });
    }

    return res.status(200).send({ message: "Food deleted successfully" });
  } catch (error) {
    console.error("Error deleting food", error);
    return res.status(500).send({ message: "Server error", error });
  }
};
