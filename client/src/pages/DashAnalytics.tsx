import { useEffect, useState } from "react";
import PostCard, { postType } from "../components/PostCard";
import { Select } from "flowbite-react";
import { Link } from "react-router-dom";

function DashAnalytics() {
  const [allPosts, setallPosts] = useState<postType[]>([]);
  const [order, setOrder] = useState<string>("newest");
  const [limit, setlimit] = useState(10);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `/api/post/all-posts?order=${order}&limit=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        setallPosts(data.posts);
        console.log(data);
      }
    };
    fetchPost();
  }, [order]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto text-5xl">All Posts</div>
      <div className="flex justify-around items-center">
        <p className="text-white border-2 bg-[#1F2937] p-5 m-4 text-lg rounded-lg">
          Total Posts: {allPosts.length}
        </p>
        <Select
          className="border-2 bg-[#1F2937] p-4 bd m-4  rounded-lg"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">oldest</option>
        </Select>
      </div>
      <div className="flex flex-col justify-center items-center">
        {allPosts.map((elm, ind) => (
          <Link to={`/analytics/${elm._id}`} key={ind}>
            <PostCard post={elm} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashAnalytics;
