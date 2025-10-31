import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

export const signUp = async (req, res) => {
  try {
    const { body } = req;
    const { email, password } = body;

    const hashedPassword = await bcrypt.hashSync(password, 10);

    console.log("Password", password);
    console.log("Hash password", hashedPassword);

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(200).send({ message: "Success", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error", error });
  }
};

export const signIn = async (req, res) => {
  const { body } = req;
  const { email, password } = body;
  try {
    const user = await User.findOne({ email });

    console.log("USER", user);

    if (!user.length) {
    }
    console.log("Body error", email, password);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).send({ message: "Password is incorrect" });
    } else return res.status(200).send({ message: "Success", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Server Error" });
  }
};
