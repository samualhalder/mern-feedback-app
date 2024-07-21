import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, length: { min: 6 } },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);
