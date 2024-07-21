import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/auth.route.js";
const app = express();
dotenv.config();
app.use(express.json());

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
