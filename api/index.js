import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
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
