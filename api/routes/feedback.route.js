import express from "express";
import {
  createFeedback,
  getFeedbackById,
} from "../controllers/feedback.controller.js";
import { isAuth } from "../../utils/isAuth.js";
const router = express.Router();

router
  .get("/get-feedback-by-id/:postId", isAuth, getFeedbackById)
  .post("/submit-feedback", isAuth, createFeedback);

export default router;
