import express, { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";

//DB connection
mongoose.connect(process.env.DB_URL as string);

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
