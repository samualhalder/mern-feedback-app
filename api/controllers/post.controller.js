// userId: { type: String, require: true },
// title: { type: String, require: true, length: { min: 4 } },
// description: { type: String, require: true, length: { min: 1 } },
// link: { type: String },
// photoURL: { type: stiring },
// questions: { type: Array, length: { max: 5 } },
// mode: { type: String },

import { json } from "express";
import { errorHandler } from "../../utils/error.js";
import Post from "../models/post.model.js";

export const createPost = (req, res, next) => {
  console.log("hit", req.body);

  const userId = req.user.id;
  console.log(req.user);

  console.log(userId);

  const { title, description, link, photoURL, questions, mode } = req.body;
  console.log(title, description, link, questions);

  if (!userId || !title || !description) {
    return next(errorHandler(400, "pls put all required fields bsdk"));
  }
  const newPost = {
    userId,
    title,
    description,
    link,
    photoURL,
    questions,
    mode,
  };
  const post = new Post(newPost);
  post
    .save()
    .then((data) =>
      res.status(200).json({ msg: "post created succesfully", post: data })
    )
    .catch((err) => res.status(400).json(err));
};

export const getAllPosts = async (req, res, next) => {
  const userId = req.user.id;
  const { order, limit } = req.body;
  try {
    const totalDocuments = await Post.find({ userId }).countDocuments();
    const result = await Post.find({ userId: userId })
      .sort({ createdAt: order === "newest" ? -1 : 1 })
      .limit(limit);

    res.status(200).json({ posts: result, totalDocuments });
  } catch (err) {
    return next(errorHandler(400, err));
  }
};
