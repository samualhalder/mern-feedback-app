import { errorHandler } from "../../utils/error.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(errorHandler(400, "enter all the fields."));
  }
  let username = name.toLowerCase().split(" ").join("");
  username += Date.now();

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    username,
    password: hashedPassword,
    email,
  };

  const user = new User(newUser);
  user
    .save()
    .then(() => res.json("sign up succesfull"))
    .catch((err) => next(errorHandler(400, err.errmsg)));
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "pls enter all the fields"));
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(400, "no such user."));
    }
    const result = bcrypt.compareSync(password, user.password);
    if (result === false) {
      return next(errorHandler(400, "wrong credentials."));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    console.log(user._doc);
    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("acesses_token", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    return next(errorHandler(404, error.errmsg));
  }
};
