import { errorHandler } from "../../utils/error.js";
import Feedback from "../models/feedback.model.js";
import Post from "../models/post.model.js";
// const feedbackSchema = new mongoose.Schema({
//   postId: { type: String, require: true },
//   userId: { type: String, require: true },
//   feedback: { type: String, require: true },
//   ratings: {
//     type: Number,
//     require: true,
//     min: [1, "rating atleast be 1."],
//     max: [5, "rating atmax can be 5."],
//   },
//   answears: { type: Array },
// });

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
