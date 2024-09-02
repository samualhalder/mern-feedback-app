import express from "express";
import {
  createFeedback,
  deleteFeedback,
  getAllFeedbackByUserId,
  getFeedbackByFeedbackID,
  getFeedbackById,
  getFeedbacksByPostId,
  updateFeedback,
} from "../controllers/feedback.controller.js";
import { isAuth } from "../../utils/isAuth.js";
const router = express.Router();

router
  .get("/get-feedback-by-feedbackId/:feedbackId", getFeedbackByFeedbackID)
  .get("/get-feedback-by-id/:postId", isAuth, getFeedbackById)
  .get("/get-all-feedbacks-by-userId", isAuth, getAllFeedbackByUserId)
  .get("/get-feedbacks-by-postId/:postId", isAuth, getFeedbacksByPostId)
  .post("/submit-feedback", isAuth, createFeedback)
  .post("/update-feedback/:feedbackId", isAuth, updateFeedback)
  .delete("/delete-feedback/:feedbackId", isAuth, deleteFeedback);

export default router;
