import { Router } from "express";
import { signIn, signUp } from "../controller/userController.js";

export const userRouter = Router();

userRouter.post("/sign-up", signUp);
userRouter.get("/sign-in", signIn);
