import express from "express";
import { isAuth } from "../../utils/isAuth.js";
import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  postById,
} from "../controllers/post.controller.js";
const router = express.Router();
router
  .get("/all-posts", isAuth, getAllPosts)
  .get("/get-one-post/:postId", postById)
  .post("/create-post", isAuth, createPost)
  .delete("/delete-post/:postId/:postUserId", isAuth, deletePost)
  .put("/edit-post/:postId", isAuth, editPost);

export default router;
