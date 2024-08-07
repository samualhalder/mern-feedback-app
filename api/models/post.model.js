import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: String, require: true },
    title: { type: String, require: true, length: { min: 4 } },
    description: { type: String, require: true, length: { min: 1 } },
    link: { type: String },
    photoURL: { type: String },
    questions: { type: Array, length: { max: 5 } },
    mode: { type: String, require: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
