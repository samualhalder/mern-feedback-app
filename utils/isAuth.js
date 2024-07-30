import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";
import express from "express";

export const isAuth = async (req, res, next) => {
  const token = req.cookies.acesses_token;
  if (!token) {
    return next(errorHandler(400, "no such user."));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(400, err));
    }
    req.user = user;
    next();
  });
};
