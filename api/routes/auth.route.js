import express from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signUp).post("/signin", signIn);
export default router;
