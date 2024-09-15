import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postType } from "../components/PostCard";
import { TfiDirection } from "react-icons/tfi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaShare, FaCheck } from "react-icons/fa";
import {
  Alert,
  Button,
  HR,
  Label,
  Modal,
  Rating,
  Spinner,
  Textarea,
} from "flowbite-react";

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

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type answearType = {
  id: string;
  answear: string;
};

function Post() {
  const { currentUser } = useSelector((state: RootState) => state.user);

  const { postId } = useParams();
  const [post, setPost] = useState<postType | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const stars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
  const [rating, setRating] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [postDeleteMessage, setPostDeleteMessage] = useState(null);
  const navigation = useNavigate();
  const [answears, setAnswears] = useState<answearType[]>([]);
  const [feedback, setFeedback] = useState("");
  const [isLoadng, setIsLoadng] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setsuccess] = useState<string | null>(null);
  const [openFeedbackMoadal, setOpenFeedbackMoadal] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [copiedToclickBoard, setCopiedToclickBoard] = useState(false);

  const shareableURL = window.location.href;

  //    create feedback----------->

  const handleAnswear = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let flag = false;
    answears.forEach((element) => {
      if (element.id === e.target.id) {
        flag = true;
        element.answear = e.target.value;
      }
    });
    if (flag) {
      setAnswears([...answears]);
    } else {
      setAnswears([...answears, { id: e.target.id, answear: e.target.value }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setsuccess(null);
    setErrorMessage(null);
    if (currentUser === null) {
      return setErrorMessage("please verify your self");
    }
    if (answears.length !== post?.questions.length || feedback === "") {
      return setErrorMessage("pls enter all the fileds.");
    }
    setIsLoadng(true);
    const formData = {
      feedback,
      answears,
      ratings: rating,
      postId: post?._id,
      userId: currentUser._id,
    };

    try {
      const response = await fetch("/api/feedback/submit-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setsuccess("feedback added succesfully");
      } else {
        setErrorMessage(data.errMessege);
      }
    } catch (error) {
      setErrorMessage("some Thing went wrong");
    }
    setIsLoadng(false);
  };
  //   Delete post --------------->

  const handleDeletePost = async () => {
    setPostDeleteMessage(null);
    setOpenModal(false);
    try {
      const response = await fetch(
        `/api/post/delete-post/${postId}/${post?.userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        navigation("/dashboard?tab=all-posts");
      } else {
        setPostDeleteMessage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update feedback
  const handleEdit = async () => {
    setIsLoadng(true);
    setsuccess(null);
    setErrorMessage(null);

    try {
      const editedFormData = {
        feedback,
        rating,
        answears,
      };
      const response = await fetch(
        `/api/feedback/update-feedback/${feedbackId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedFormData),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setsuccess("Feedback updated succesfully.");
      } else {
        setErrorMessage(data.errMessege.message);
      }
      setIsLoadng(false);
    } catch (error) {
      console.log(error);
      setIsLoadng(false);
    }
  };

  // check if the user already given the feedback
  const fetchFeedback = async () => {
    const postRes = await fetch(`/api/feedback/get-feedback-by-id/${postId}`);
    const data = await postRes.json();
    if (postRes.ok) {
      setFeedback(data.feedback);
      setRating(data.ratings);
      setAnswears(data.answears);
      setFeedbackId(data._id);
    }
  };

  // delete feedback -------------->

  const deleteFeedback = async () => {
    setOpenFeedbackMoadal(false);
    setsuccess(null);
    setErrorMessage(null);
    try {
      const response = await fetch(
        `/api/feedback/delete-feedback/${feedbackId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setsuccess("post deleted succesfully.");
      } else {
        setErrorMessage(data.errMessege);
      }
    } catch (error) {
      setErrorMessage("some thing went wrong.");
    }
  };

  // use Effects----------------->

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/post/get-one-post/${postId}`);
      const data = await response.json();
      if (response.ok) {
        setPost(data);
      }
    };
    fetchPost();
    fetchFeedback();
  }, [postId]);

  if (post == null) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner size={"xl"} />;
      </div>
    );
  } else {
    return (
      <div className="min-h-screen dark:text-white flex flex-col items-center gap-6 p-4">
        <h1 className=" text-4xl ">{post?.title}</h1>

        <HR />
        <p className="text-lg w-full md:w-[700px]">{post?.description}</p>
        <div className="h-[400px] w-[full] md:w-[700px] p-3">
          <img
            className="h-full w-full flex justify-center items-center"
            src={post.photoURL}
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

        {/* For other users --------------------->  */}

        {
          // modal for delete feedback

          <Modal
            show={openFeedbackMoadal}
            size="md"
            onClose={() => setOpenFeedbackMoadal(false)}
            popup
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete your{" "}
                  <span className="text-red-400">feedback</span>?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={deleteFeedback}>
                    {"Yes, I'm sure"}
                  </Button>
                  <Button
                    color="gray"
                    onClick={() => setOpenFeedbackMoadal(false)}
                  >
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal>
        }

        {!currentUser && (
          <div className="flex gap-3 flex-col">
            <h1 className="text-xl ">Sign in to give feedback</h1>
            <Button href="/signin">Sign in</Button>
          </div>
        )}

        {currentUser && post.userId !== currentUser?._id && (
          <form
            className="flex flex-col  justify-center items-center gap-3"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col">
              <Label className=" text-md mx-auto my-2">rate this product</Label>

              <Rating size="lg">
                {stars.map((elm) => (
                  <Rating.Star
                    filled={elm.id <= rating}
                    onClick={() => setRating(elm.id)}
                  />
                ))}
              </Rating>
            </div>
            <div className="w-full md:w-[700px]">
              <Label>Your feedback</Label>
              <Textarea
                className="w-full md:w-[700px]"
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                placeholder="write your openion/feedback here"
              />
            </div>
            {post.questions && <h1>please answare this questions</h1>}
            {post.questions.map((e, ind) => {
              let value;
              answears.forEach((ans) => {
                if (ans.id == e.id) value = ans.answear;
              });
              return (
                <div className="w-full md:w-[700px]">
                  <p key={ind}>{e.question}</p>
                  <Textarea
                    className="mt-1"
                    id={e.id}
                    value={value}
                    onChange={(ev) => handleAnswear(ev)}
                    placeholder="write your answear for this question."
                  ></Textarea>
                </div>
              );
            })}
            {feedbackId ? (
              <div className="flex gap-2">
                <Button onClick={handleEdit} disabled={isLoadng}>
                  {isLoadng ? <Spinner /> : "Save"}
                </Button>
                <Button
                  color={"red"}
                  onClick={() => setOpenFeedbackMoadal((pre) => !pre)}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <Button type="submit" disabled={isLoadng}>
                {isLoadng ? <Spinner /> : "Submit"}
              </Button>
            )}
            {errorMessage && <Alert color={"failure"}>{errorMessage}</Alert>}
            {success && <Alert color={"success"}>{success}</Alert>}
          </form>
        )}

        {/* for the post crator ---------------------> */}

        {post.userId === currentUser?._id && (
          <div className="w-full md:w-[700px] flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">Questions</h1>
            <div className="w-full">
              {post.questions.map((elm, ind) => (
                <p
                  key={ind}
                  className="text-lg border-2 border-cyan-300 p-2 m-2 rounded-xl"
                >
                  {elm.question}
                </p>
              ))}
            </div>
            <HR />
            <div className="flex gap-4">
              <Button onClick={() => navigation(`/post/edit/${postId}`)}>
                Edit Post
              </Button>
              <Button color={"red"} onClick={() => setOpenModal(true)}>
                Delete post
              </Button>
              <Button onClick={() => setOpenShareModal(true)}>
                <FaShare size={20} />
              </Button>
            </div>
            {postDeleteMessage && <Alert>{postDeleteMessage}</Alert>}
            <Modal
              show={openModal}
              size="md"
              onClose={() => setOpenModal(false)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    Are you sure you want to <span>delete</span> this post?
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button color="failure" onClick={handleDeletePost}>
                      {"Yes, I'm sure"}
                    </Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
        )}

        {/* Share this post */}

        <Modal
          show={openShareModal}
          size="md"
          onClose={() => setOpenShareModal(false)}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Share this feedback form
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
}

export default Post;
