import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postType } from "../components/PostCard";
import { TfiDirection } from "react-icons/tfi";
import { Button, Spinner } from "flowbite-react";

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState<postType | null>(null);
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
      <div className="h-screen dark:text-white flex flex-col items-center gap-6">
        <h1 className=" text-4xl ">{post?.title}</h1>
        <p className="text-lg">{post?.description}</p>
        <Button gradientDuoTone={"purpleToPink"} outline pill>
          <a
            className=" block text-blue-500 hover:text-blue-300 text-lg"
            href={post?.link}
          >
            for informations visit here.
            <TfiDirection className="inline mx-5" />
          </a>
        </Button>
      </div>
    );
  }
}

export default Post;
