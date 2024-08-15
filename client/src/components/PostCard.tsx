import { useState } from "react";

export type postType = {
  _id?: string;
  userId: string;
  title: string;
  description: string;
  link: string;
  photoURL: string;
  questions: string[];
  mode: string;
  createdAt: Date;
};
function PostCard({ post }: { post: postType }) {
  const [date, setdate] = useState<Date>();
  //   setdate(new Date(post.createdAt));
  //   console.log(date);

  return (
    <div className="h-[310px] w-[400px] border-2 border-cyan-500 rounded-md m-3 p-4">
      <div className="h-[65%] overflow-hidden object-contain">
        <img className="h-full w-full" src={post.photoURL} alt="img" />
      </div>
      <div>
        <h1 className=" font-sans text-xl font-bold mb-2">{post.title}</h1>
        <span className="bg-gray-400 rounded-3xl p-1 mt-2 text-sm">
          {post.mode}
        </span>
        <p className="m-1">{new Date(post.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default PostCard;
