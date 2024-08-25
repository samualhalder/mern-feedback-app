import { errorHandler } from "../../utils/error.js";
import Feedback from "../models/feedback.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createFeedback = async (req, res, next) => {
  const authUserId = req.user.id;
  const { postId, userId, feedback, ratings, answears } = req.body;

  if (!postId || !userId || !feedback || !ratings || !answears) {
    return next(errorHandler(400, "plase fill all the fields."));
  }

  if (authUserId !== userId) {
    return next(errorHandler(400, "you are not verified."));
  }
  try {
    const post = await Post.findById({ _id: postId });

    if (!post) {
      return next(errorHandler(400, "no such post."));
    }
    if (post.userId === userId) {
      return next(
        errorHandler(400, "you cant give a feedback on your own post")
      );
    }
    const findPreFeedback = await Feedback.findOne({ postId, userId });
    if (findPreFeedback) {
      return next(
        errorHandler(400, "you have already submitted the feedback.")
      );
    }
    const newFeddback = new Feedback({
      postId,
      userId,
      feedback,
      ratings,
      answears,
    });
    const result = await newFeddback.save();
    res
      .status(200)
      .json({ message: "feedback submited successfully", feedback: result });
  } catch (error) {
    return next(errorHandler(400, error));
  }
};

export const updateFeedback = async (req, res, next) => {
  const authUserId = req.user.id;
  const { feedbackId } = req.params;
  const { feedback, rating, answears } = req.body;

  try {
    const feedbackMain = await Feedback.findOne({ _id: feedbackId });

    if (!feedbackMain) {
      return next(errorHandler(400, "There is no such feedback."));
    }
    if (feedbackMain.userId !== authUserId) {
      return next(
        errorHandler(400, "you are not allowed to update this post.")
      );
    }
    const response = await Feedback.findByIdAndUpdate(
      { _id: feedbackId },
      {
        $set: {
          feedback: feedback,
          ratings: rating,
          answears: answears,
        },
      },
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "feedback updated successfully", response });
  } catch (error) {
    return next(errorHandler(400, error));
  }
};

export const getFeedbackById = async (req, res, next) => {
  const { postId } = req.params;
  const userId = req.user.id;
  try {
    const feedback = await Feedback.findOne({ postId: postId, userId: userId });
    const user = await User.findById({ _id: userId });

    if (!feedback) {
      return next(errorHandler(400, "There is no such feddback."));
    }
    if (!user) {
      return next(errorHandler(400, "There is no such user."));
    }
    res.status(200).json(feedback);
  } catch (error) {
    return next(errorHandler(400, error));
  }
};

export const deleteFeedback = async (req, res, next) => {
  const { feedbackId } = req.params;
  const authUserId = req.user.id;
  try {
    const feedback = await Feedback.findById({ _id: feedbackId });
    if (!feedback) {
      return next(errorHandler(400, "no such feedback."));
    }
    console.log("userId", feedback.userId);
    console.log("authuser id", authUserId);

    if (feedback.userId !== authUserId) {
      return next(
        errorHandler(400, "you are not allowed to delete this post.")
      );
    }
    await Feedback.findByIdAndDelete({ _id: feedbackId });
    res.status(200).json("feedback deleted succesfully.");
  } catch (error) {
    return next(errorHandler(400, error));
  }
};
