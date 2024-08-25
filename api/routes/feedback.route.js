import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getFeedbackById,
  updateFeedback,
} from "../controllers/feedback.controller.js";
import { isAuth } from "../../utils/isAuth.js";
const router = express.Router();

router
  .get("/get-feedback-by-id/:postId", isAuth, getFeedbackById)
  .post("/submit-feedback", isAuth, createFeedback)
  .post("/update-feedback/:feedbackId", isAuth, updateFeedback)
  .delete("/delete-feedback/:feedbackId", isAuth, deleteFeedback);

export default router;
