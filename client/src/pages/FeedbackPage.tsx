import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { postType } from "../components/PostCard";

import { HR, Label, Rating } from "flowbite-react";
import { FeedbackType } from "./DashAllFeedbacks";

function FeedbackPage() {
  console.log("Feedback page loaded");
  const { feedbackId } = useParams();
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [post, setPost] = useState<postType | null>(null);
  const stars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

  const fetchPost = async (postId: string) => {
    try {
      const response = await fetch(`/api/post/get-one-post/${postId}`);
      const data = await response.json();
      if (response) {
        setPost(data);
      }
    } catch (error) {
      console.log("some thing went wrong.");
    }
  };
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch(
          `/api/feedback/get-feedback-by-feedbackId/${feedbackId}`
        );
        const data = (await response.json()) as FeedbackType;
        if (response) {
          setFeedback(data);
          fetchPost(data.postId);
        }
      } catch (error) {
        console.log("some thing went wrong.");
      }
    };
    fetchFeedback();
  }, []);

  return (
    <div className="min-h-screen dark:text-white flex flex-col items-center gap-6 p-4">
      {/* For other users --------------------->  */}

      <div className="flex flex-col  justify-center items-center gap-3">
        <div className="flex flex-col">
          <Label className=" text-md mx-auto my-2">rate this product</Label>

          <Rating size="lg">
            {stars.map((elm) => (
              <Rating.Star filled={elm.id <= feedback?.ratings} key={elm.id} />
            ))}
          </Rating>
        </div>
        <div className="w-full md:w-[700px]">
          <Label>feedback</Label>
          <p className="border-2 border-gray-400 p-2 mt-2 rounded-lg">
            {feedback?.feedback}
          </p>
        </div>
        <HR />
        {post?.questions.map((e, ind) => {
          let value;
          feedback.answears.forEach((ans) => {
            if (ans.id == e.id) value = ans.answear;
          });
          return (
            <div className="w-full md:w-[700px]">
              <p key={ind}>{e.question}</p>
              <p className="border-2 border-gray-400 p-2 mt-2 rounded-lg">
                {value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeedbackPage;
