import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import categoryRouter from "./routes/foodCategoryRoute.js";
import { userRouter } from "./routes/userRoute.js";
import cors from "cors";

configDotenv();

const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/food-category", categoryRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running", PORT);
});
