import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postType } from "../components/PostCard";
import { TfiDirection } from "react-icons/tfi";
import { Button, Label, Spinner, Textarea } from "flowbite-react";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState<postType | null>(null);
  const [rating, setRating] = useState(0);
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
      <div className="min-h-screen dark:text-white flex flex-col items-center gap-6">
        <h1 className=" text-4xl ">{post?.title}</h1>
        <p className="text-lg">{post?.description}</p>
        <div className="h-[400px] w-[full] md:w-[500px] p-3">
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
          >
            for informations visit here.
            <TfiDirection className="inline mx-5" />
          </a>
        </Button>
        <div className="flex flex-col">
          <Label className=" text-md mx-auto my-2">rate this product</Label>
          // TODO have TO create Rating giving system
        </div>
        <div className="m-5">
          <Label>Your feedback</Label>
          <Textarea className="w-[400px] md:w-[500px]" rows={4} />
        </div>
        {post.questions.map((e, ind) => {
          return <p key={ind}>{e.question}</p>;
        })}
      </div>
    );
  }
}

export default Post;
