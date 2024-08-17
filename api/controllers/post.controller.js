import { errorHandler } from "../../utils/error.js";
import Post from "../models/post.model.js";

export const createPost = (req, res, next) => {
  console.log("hit", req.body);

  const userId = req.user.id;
  console.log(req.user);

  console.log(userId);

  let { title, description, link, photoURL, questions, mode, username } =
    req.body;

  if (!userId || !title || !description) {
    return next(errorHandler(400, "pls put all required fields bsdk"));
  }
  const newPost = {
    userId,
    username,
    title,
    description,
    link,
    questions,
    mode,
  };
  if (photoURL != "") {
    newPost.photoURL = photoURL;
  }
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
  const { order, limit } = req.query;
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

export const postById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById({ _id: postId });
    if (!post) {
      return next(errorHandler(400, "no such post is avilable."));
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    return next(errorHandler(400, error.errmsg));
  }
};

export const deletePost = async (req, res, next) => {
  const { postId, postUserId } = req.params;
  const userId = req.user.id;

  try {
    if (postUserId !== userId) {
      return next(
        errorHandler(400, "you are not allowed to delete this post.")
      );
    }
    const post = await Post.findById({ _id: postId });
    if (post == null) {
      return next(errorHandler(400, "no such post."));
    }
    const response = await Post.findByIdAndDelete({ _id: postId });
    if (response) {
      res.status(200).json("post deleted succesfully.");
    } else {
      return next(errorHandler(400, response));
    }
  } catch (error) {
    return next(errorHandler(400, error));
  }
};
