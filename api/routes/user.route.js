import express from "express";
import { isAuth } from "../../utils/isAuth.js";
import { deleteUser, editUser } from "../controllers/user.controller.js";

const router = express.Router();
router
  .post("/updateUser/:id", isAuth, editUser)
  .delete("/deleteUser/:userId", isAuth, deleteUser);

export default router;