export type questionType = {
  id: string;
  question: string;
};
export type postType = {
  _id?: string;
  username?: string;
  userId: string;
  title: string;
  description: string;
  link: string;
  photoURL: string;
  questions: questionType[];
  mode: string;
  createdAt: Date;
};
function PostCard({ post }: { post: postType }) {
  console.log(post);

  return (
    <div className="h-[310px] w-[400px] flex flex-col justify-between bg-[#F3F4F6] dark:bg-[#1F2937] shadow-lg rounded-md m-3 p-4 gap-3">
      <div className="min-h-[65%] overflow-hidden object-contain">
        <img className="h-full w-full" src={post.photoURL} alt="img" />
      </div>
      <div>
        <h1 className=" font-sans text-xl font-bold mb-2 line-clamp-2">
          {post.title}
        </h1>
      </div>
    </div>
  );
}

export default PostCard;
