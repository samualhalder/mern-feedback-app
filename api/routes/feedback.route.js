import express from "express";
import { createFeedback } from "../controllers/feedback.controller.js";
import { isAuth } from "../../utils/isAuth.js";
const router = express.Router();

router.post("/submit-feedback", isAuth, createFeedback);

export default router;
