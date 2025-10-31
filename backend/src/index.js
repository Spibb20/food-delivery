import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import categoryRouter from "./routes/foodCategoryRoute.js";
import { userRouter } from "./routes/userRoute.js";

configDotenv();

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use("/food-category", categoryRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running", PORT);
});
