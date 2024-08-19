import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  postId: { type: String, require: true },
  userId: { type: String, require: true },
  feedback: { type: String, require: true },
  ratings: {
    type: Number,
    require: true,
    min: [1, "rating atleast be 1."],
    max: [5, "rating atmax can be 5."],
  },
  answears: { type: Array },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
