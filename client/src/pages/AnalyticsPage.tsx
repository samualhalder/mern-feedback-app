import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FeedbackType } from "./DashAllFeedbacks";
import { Button, HR, Modal } from "flowbite-react";
import FeedbackCard from "../components/FeedbackCard";
import { postType } from "../components/PostCard";
import { TfiDirection } from "react-icons/tfi";
import { IoStarSharp } from "react-icons/io5";
import { FaCheck, FaShare } from "react-icons/fa";

import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

export default function AnalyticsPage() {
  const { postId } = useParams();
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>();
  const [post, setPost] = useState<postType>();
  const [avgRatings, setAvgRatings] = useState<number>(-1);
  const [openModal, setOpenModal] = useState(false);
  const [copiedToclickBoard, setCopiedToclickBoard] = useState(false);

  const shareableURL = window.location.href;

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

      fetch(`/api/feedback/get-avg-rating/${postId}`)
        .then((res) => res.json())
        .then((res) => setAvgRatings(res[0].averageRating))
        .catch((err) => console.log(err));
      console.log(avgRatings);

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
        <div
          className={`border-2 ${avgRatings >= 4 && "bg-green-400"}
            ${avgRatings >= 2 && avgRatings < 4 && "bg-yellow-400 "}
            ${avgRatings <= 1 && "bg-red-600"}
            ${avgRatings === -1 && `hidden`}
           p-4  m-4  rounded-lg w-40 text-center`}
        >
          <p>
            Average rating:{" "}
            <span className="flex justify-center items-center font-semibold text-xl">
              {avgRatings.toFixed(1)}
              <IoStarSharp />
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        {feedbacks?.map((elm, ind) => (
          <Link to={`/feedback/${elm._id}`} key={ind}>
            <FeedbackCard feedback={elm} />
          </Link>
        ))}
      </div>
      <Button onClick={() => setOpenModal(true)}>
        <FaShare size={20} />
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Share this page as a testimonial
            </h3>
            <div className="my-4 flex gap-1 border-2 border-cyan-500 rounded-xl overflow-hidden">
              <p className="pl-1 py-2 dark:text-white truncate">
                {shareableURL}
              </p>
              <Button
                className=" ring-0 rounded-l-none text-center"
                onClick={() => {
                  setCopiedToclickBoard(true);
                  navigator.clipboard.writeText(shareableURL);
                }}
              >
                {!copiedToclickBoard ? "Copy" : <FaCheck size={20} />}
              </Button>
            </div>
            <div className="flex justify-center gap-4">
              <FacebookShareButton url={shareableURL}>
                {" "}
                <FacebookIcon size={35} round={true} />
              </FacebookShareButton>
              <TwitterShareButton url={shareableURL}>
                {" "}
                <TwitterIcon size={35} round={true} />
              </TwitterShareButton>
              <RedditShareButton url={shareableURL}>
                {" "}
                <RedditIcon size={35} round={true} />
              </RedditShareButton>
              <LinkedinShareButton url={shareableURL}>
                {" "}
                <LinkedinIcon size={35} round={true} />
              </LinkedinShareButton>
              <TelegramShareButton url={shareableURL}>
                {" "}
                <TelegramIcon size={35} round={true} />
              </TelegramShareButton>
              <WhatsappShareButton url={shareableURL}>
                {" "}
                <WhatsappIcon size={35} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
