import express from "express";
import { isAuth } from "../../utils/isAuth.js";
import { createPost } from "../controllers/post.controller.js";
const router = express.Router();
router.post("/create-post", isAuth, createPost);

export default router;
