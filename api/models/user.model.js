import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true, length: { min: 6 } },
    photoURL: {
      type: String,

      default:
        "https://w7.pngwing.com/pngs/831/88/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-design-smile-thumbnail.png",
    },
  },
  { timestamps: true }
);
export const User = mongoose.model("User", userSchema);