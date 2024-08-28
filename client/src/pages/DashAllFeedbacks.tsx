import { Select } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeedbackCard from "../components/FeedbackCard";

type ansType = {
  id: string;
  answeat: string;
};

export type FeedbackType = {
  _id: string;
  postId: string;
  userId: string;
  feedback: string;
  ratings: number;
  answears: ansType[];
  createdAt: Date;
};

function DashAllFeedbacks() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [order, setOrder] = useState<string>("desc");

  const fetchFeedback = async () => {
    const response = await fetch(
      `/api/feedback/get-all-feedbacks-by-userId?order=${order}`
    );
    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      setFeedbacks(data);
      console.log(data);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [order]);
  useEffect(() => {
    fetchFeedback();
  }, []);
  return (
    <div className="min-h-screen w-[100%] flex flex-col gap-5">
      <h1 className="text-5xl mx-auto">All Feedbacks</h1>
      <div className="flex justify-around">
        <p className="text-white border-2 bg-[#1F2937] p-5 m-4 text-lg rounded-lg">
          Total no of feedbacks given : {feedbacks.length}
        </p>
        <Select
          className="border-2 bg-[#1F2937] p-4 bd m-4  rounded-lg"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="desc">Newest</option>
          <option value="asc">oldest</option>
        </Select>
      </div>
      <div className="flex flex-col justify-center items-center">
        {feedbacks.map((elm, ind) => (
          <Link to={`/post/${elm.postId}`} key={ind}>
            <FeedbackCard feedback={elm} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashAllFeedbacks;
