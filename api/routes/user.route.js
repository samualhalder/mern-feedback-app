import express from "express";
import { isAuth } from "../../utils/isAuth.js";
import { editUser } from "../controllers/user.controller.js";

const router = express.Router();
router.post("/updateUser/:id", isAuth, editUser);

export default router;
