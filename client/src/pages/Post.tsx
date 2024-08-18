import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postType } from "../components/PostCard";
import { TfiDirection } from "react-icons/tfi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
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
import { useSelector } from "react-redux";

function Post() {
  const { currentUser } = useSelector((state) => state.user);
  const { postId } = useParams();
  const [post, setPost] = useState<postType | null>(null);
  const [stars, setstars] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);
  const [rating, setRating] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [postDeleteMessage, setPostDeleteMessage] = useState(null);
  const navigator = useNavigate();

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
        console.log("post delered succesfully");
        navigator("/dashboard?tab=all-posts");
      } else {
        setPostDeleteMessage(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(`/api/post/get-one-post/${postId}`);
      const data = await response.json();
      if (response.ok) {
        setPost(data);
      } else {
        console.log(response);
      }
    };
    fetchPost();
  }, [postId]);
  console.log(post);

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

        {post.userId !== currentUser._id && (
          <section className="flex flex-col  justify-center items-center gap-3">
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
                rows={4}
                placeholder="write your openion/feedback here"
              />
            </div>
            {post.questions && <h1>please answare this questions</h1>}
            {post.questions.map((e, ind) => (
              <div className="w-full md:w-[700px]">
                <p key={ind}>{e.question}</p>
                <Textarea
                  className="mt-1"
                  placeholder="write your answear for this question."
                ></Textarea>
              </div>
            ))}
            <Button>Submit</Button>
          </section>
        )}
        {post.userId === currentUser._id && (
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
              <Button onClick={() => navigator(`/post/edit/${postId}`)}>
                Edit Post
              </Button>
              <Button color={"red"} onClick={() => setOpenModal(true)}>
                Delete post
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
      </div>
    );
  }
}

export default Post;
