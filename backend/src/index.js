import cors from "cors";
import { configDotenv } from "dotenv";
import express from "express";
import { connectDB } from "./database/db.js";
import categoryRouter from "./routes/foodCategoryRoute.js";
import orderRouter from "./routes/foodOrderRoute.js";
import foodRouter from "./routes/foodRoute.js";
import { clerkMiddleware } from "@clerk/express";

configDotenv();
const app = express();
const port = Number(process.env.PORT) || 4000;
const allowedOrigins = new Set(
  (process.env.FRONTEND_URL || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim().replace(/\/$/, ""))
    .filter(Boolean)
);

app.disable("x-powered-by");
app.use(
  cors({
    origin(origin, callback) {
      const normalized = origin?.replace(/\/$/, "");
      const previewAllowed =
        process.env.ALLOW_VERCEL_PREVIEWS === "true" &&
        /^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(normalized || "");
      if (!origin || allowedOrigins.has(normalized) || previewAllowed)
        return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(clerkMiddleware());
app.get("/health", (_req, res) =>
  res.json({ ok: true, service: "food-delivery-backend" })
);
app.use(async (_req, res, next) => {
  try {
    await connectDB();
    return next();
  } catch (error) {
    console.error("MongoDB connection failed", error);
    return res.status(503).json({ message: "Database is unavailable" });
  }
});
app.use("/category", categoryRouter);
app.use("/foods", foodRouter);
app.use("/order", orderRouter);
app.use((_req, res) => res.status(404).json({ message: "Route not found" }));
app.use((error, _req, res, _next) => {
  console.error(error);
  res
    .status(error?.status || 500)
    .json({ message: error?.message || "Internal server error" });
});
if (!process.env.VERCEL)
  app.listen(port, () =>
    console.log(`Backend running at http://localhost:${port}`)
  );
export default app;
