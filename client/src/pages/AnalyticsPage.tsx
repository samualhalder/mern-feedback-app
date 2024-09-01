import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FeedbackType } from "./DashAllFeedbacks";
import { Button, HR, Select } from "flowbite-react";
import FeedbackCard from "../components/FeedbackCard";
import { postType } from "../components/PostCard";
import { TfiDirection } from "react-icons/tfi";

export default function AnalyticsPage() {
  const { postId } = useParams();
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>();
  const [post, setPost] = useState<postType>();
  useEffect(() => {
    try {
      const fetchFeedback = async () => {
        console.log("runs");

        const result = await fetch(
          `/api/feedback/get-feedbacks-by-postId/${postId}`
        );
        const data = await result.json();
        if (result.ok) {
          setFeedbacks(data);
        }
      };
      const fetchPost = async () => {
        console.log("runs");

        const result = await fetch(`/api/post/get-one-post/${postId}`);
        const data = await result.json();
        if (result.ok) {
          setPost(data);
        }
      };

      fetchFeedback();
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, []);
  console.log(feedbacks);

  return (
    <div className="min-h-screen dark:text-white flex flex-col items-center gap-6 p-4">
      {/* Post Section */}

      <h1 className=" text-4xl ">{post?.title}</h1>

      <HR />
      <p className="text-lg w-full md:w-[700px]">{post?.description}</p>
      <div className="h-[400px] w-[full] md:w-[700px] p-3">
        <img
          className="h-full w-full flex justify-center items-center"
          src={post?.photoURL}
          alt="image"
        />
      </div>
      <Button gradientDuoTone={"purpleToPink"} outline pill>
        <a
          className=" block text-blue-500 hover:text-blue-300 text-lg"
          href={post?.link}
          target="_new"
        >
          for informations visit here.
          <TfiDirection className="inline mx-5" />
        </a>
      </Button>
      <h1 className="text-xl font-bold">Questions</h1>
      <div className="flex-1">
        {post?.questions.map((elm, ind) => (
          <p
            key={ind}
            className="text-lg border-2 border-cyan-300 p-2 m-2 rounded-xl"
          >
            {elm?.question}
          </p>
        ))}
      </div>

      {/* Feedback Section */}
      <HR className="text-blue-600" />
      <h1 className="text-5xl mx-auto">All Feedbacks</h1>
      <div className="flex justify-around">
        <p className="text-white border-2 bg-[#1F2937] p-5 m-4 text-lg rounded-lg">
          Total no of feedbacks given : {feedbacks?.length}
        </p>
        <Select className="border-2 bg-[#1F2937] p-4 bd m-4  rounded-lg">
          <option value="desc">Newest</option>
          <option value="asc">oldest</option>
        </Select>
      </div>
      <div className="flex flex-col justify-center items-center">
        {feedbacks?.map((elm, ind) => (
          <Link to={`/post/${elm.postId}`} key={ind}>
            <FeedbackCard feedback={elm} />
          </Link>
        ))}
      </div>
    </div>
  );
}
