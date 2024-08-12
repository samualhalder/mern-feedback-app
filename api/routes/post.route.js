import express from "express";
import { isAuth } from "../../utils/isAuth.js";
import {
  createPost,
  getAllPosts,
  postById,
} from "../controllers/post.controller.js";
const router = express.Router();
router
  .get("/all-posts", isAuth, getAllPosts)
  .get("/get-one-post/:postId", postById)
  .post("/create-post", isAuth, createPost);

export default router;
