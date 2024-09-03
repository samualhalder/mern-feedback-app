import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import feedbackRouter from "./routes/feedback.route.js";
import path from "path";
const __dirname = path.resolve();

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// Data base connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Data Base is connected"))
  .catch((err) => console.log(err));
app.listen(process.env.PORT, () => {
  console.log(`server is runing at port ${process.env.PORT}`);
});

// Routers

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/feedback", feedbackRouter);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//error middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const errMessege = err.message || "Interanl server error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    errMessege,
  });
});
