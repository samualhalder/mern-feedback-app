import { errorHandler } from "../../utils/error.js";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

//Sihnup

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
    .then(() => res.status(200).json("sign up succesfull"))
    .catch((err) => next(errorHandler(400, err.errmsg)));
};

//SignIn

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

// O-Auth

export const OAuth = async (req, res, next) => {
  const { name, email, photoURL } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const { password: pass, ...rest } = user._doc;

      res
        .status(200)
        .cookie("acesses_token", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        })
        .json(rest);
    } else {
      let password = "";
      const arrrey =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabckefghijklmnopqrstuvwxyz1234567890@#$%&";
      for (let i = 0; i < 13; i++) {
        const num = Math.round(Math.random() * 68);
        password += arrrey[num];
      }
      let username = name.toLowerCase().split(" ").join("");
      username += Date.now();
      const hashedPassword = bcrypt.hashSync(password, 10);
      const tmpUser = {
        username: username,
        password: hashedPassword,
        email: email,
        photoURL: photoURL,
      };
      const newUser = new User(tmpUser);
      newUser
        .save()
        .then((result) => {
          const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
          const { password: pass, ...rest } = result._doc;
          res
            .status(200)
            .cookie("acesses_token", token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            })
            .json(rest);
        })
        .catch((err) => next(errorHandler(400, err.errmsg)));
    }
  } catch (error) {
    return next(errorHandler(400, error));
  }
};
