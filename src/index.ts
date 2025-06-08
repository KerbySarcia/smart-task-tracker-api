import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db";

import taskRoute from "./routes/task.route";
import userRoute from "./routes/user.route";
import fileRoute from "./routes/file.route";
import limiter from "./config/rate-limit";

const app = express();
app.use(cors());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Smart Task Tracker API");
});

app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/files", fileRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});
