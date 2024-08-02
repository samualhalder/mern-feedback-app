import { errorHandler } from "../../utils/error.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
export const editUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(400, "you are not allowed to edit profile."));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(401, "password must be more than 6 charerters"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 8 || req.body.username.length > 20) {
      return next(errorHandler(401, "username must be in the range of 8-20 "));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(401, "username must be in lower case"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(
          401,
          "user name must have contain only charecters form a to z and number 0-9"
        )
      );
    }
  }

  User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        photoURL: req.body.photoURL,
      },
    },
    { new: true }
  )
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      res.status(400).json("internel setver error.");
    });
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      errorHandler(400, "You are not allowed to delete this account.")
    );
  }

  User.findOneAndDelete({ _id: req.user.id })
    .then((data) => res.status(200).json("user id deleted."))
    .catch((err) => next(errorHandler(400, err)));
};
