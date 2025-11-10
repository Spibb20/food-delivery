import { Router } from "express";
import {
  deleteUser,
  signIn,
  signUp,
  updateUser,
} from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

export const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.get("/sign-in", signIn);

userRouter.patch("/:userId", auth, updateUser);
userRouter.delete("/:userId", auth, deleteUser);
