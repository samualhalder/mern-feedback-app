import { Select } from "flowbite-react";
import { useEffect, useState } from "react";

function DashAllPosts() {
  const [allPosts, setallPosts] = useState([]);
  const [order, setOrder] = useState<string>("newest");
  const [limit, setlimit] = useState(10);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `/api/post/all-posts?order=${order}&limit=${limit}`
      );
      const data = await response.json();
      if (response.ok) {
        setallPosts(data);
      }
    };
    fetchPost();
  }, [order]);
  console.log(allPosts);
  return (
    <div className="flex flex-col">
      <div className="mx-auto text-5xl">All Posts</div>
      <div className="flex justify-around items-center">
        <p className="text-white border-2 bg-[#1F2937] p-5 m-4 text-lg rounded-lg">
          Total Posts: {allPosts && allPosts.totalDocuments}
        </p>
        <Select
          className="border-2 bg-[#1F2937] p-4 bd m-4  rounded-lg"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">oldest</option>
        </Select>
      </div>
    </div>
  );
}

export default DashAllPosts;
