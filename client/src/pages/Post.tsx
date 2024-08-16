import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postType } from "../components/PostCard";
import { TfiDirection } from "react-icons/tfi";
import { Button, HR, Label, Rating, Spinner, Textarea } from "flowbite-react";
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
              {post.questions.map((elm) => (
                <p
                  key={elm.id}
                  className="text-lg border-2 border-cyan-300 p-2 m-2 rounded-xl"
                >
                  {elm.question}
                </p>
              ))}
            </div>
            <Button>Edit Post</Button>
          </div>
        )}
      </div>
    );
  }
}

export default Post;
