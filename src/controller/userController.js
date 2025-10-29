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
      password,
    });

    res.status(200).send({ message: "Success", data: user });
  } catch (error) {
    res.status(500).send({ message: "Error", error });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    console.log("USER", user);

    console.log("Body error", email, password);

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (!isPasswordCorrect) {
      res.status(403).send({ message: "Password is incorrect" });
    } else {
      res.status(200).send({ message: "Success", data: user });
    }
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

/*const { body } = req;
  const { email, password } = body;

  const user = await User.findOne({ email });

  console.log("USER", user);

  console.log("Body error", email, password);

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    res.status(403).send({ message: "Password is incorrect" });
  }
  res.status(200).send({ message: "Success", data: user });*/
