import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const SECRET = process.env.SECRET;

export const signUp = async (req, res) => {
  try {
    const { email, password, phoneNumber, address } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).send({ message: "Email already exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    console.log("Password", password);
    console.log("Hash password", hashedPassword);

    const user = await User.create({
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    res.status(201).send({ message: "Success", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error", error });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log("USER", user);

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    console.log("Body error", email, password);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect)
      return res.status(403).send({ message: "Password is incorrect" });

    const token = jwt.sign({ userId: user._id, role: user.role }, SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).send({ message: "Success", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res.status(200).send({ message: "User updated", data: updatedUser });
  } catch {
    res.status(500).send({ message: "Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.status(200).send({ message: "User deleted" });
  } catch {
    res.status(500).send({ message: "Error" });
  }
};
