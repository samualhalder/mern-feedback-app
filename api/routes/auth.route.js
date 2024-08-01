import express from "express";
import {
  checkUser,
  OAuth,
  signIn,
  signUp,
} from "../controllers/auth.controller.js";
const router = express.Router();
router
  .post("/signup", signUp)
  .post("/signin", signIn)
  .post("/oauth", OAuth)
  .get("/checkuser", checkUser);
export default router;
