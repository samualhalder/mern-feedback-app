import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    userId: { type: String, require: true },
    username: { type: String },
    title: { type: String, require: true, length: { min: 4 } },
    description: { type: String, require: true, length: { min: 1 } },
    link: { type: String },
    photoURL: {
      type: String,
      default:
        "https://nederlia.com/wp-content/uploads/2018/05/98e39ed2726a47f7f3e9c24d40accc98.jpg",
    },
    questions: { type: Array, length: { max: 5 } },
    mode: { type: String, require: true },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
