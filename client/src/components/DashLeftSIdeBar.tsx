import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInbox, HiChartPie, HiViewBoards, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";

function DashLeftSIdeBar() {
  const [tab, setTab] = useState<string | null>("");
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("feedback-user");
    dispatch(signOut());
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
    const params = new URLSearchParams(location.search);
    const tabValue = params.get("tab");
    setTab(tabValue);
  }, [location.search, dispatch, currentUser, navigate]);
  console.log(tab);
  return (
    <div className="md:min-h-screen dark:text-white dark:bg-black">
      <div className="dark:bg-black">
        <Sidebar className=" dark:bg-black w-full">
          <Sidebar.Items className="dark:bg-black md:min-h-screen ">
            <Sidebar.ItemGroup className="h-full dark:bg-black">
              <Sidebar.Item href="/dashboard?tab=create-post" icon={HiChartPie}>
                New Post
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard?tab=all-posts" icon={HiViewBoards}>
                All Posts
              </Sidebar.Item>
              <Sidebar.Item href="/dashboard?tab=all-feedbacks" icon={HiInbox}>
                FeedBacks
              </Sidebar.Item>
              <Sidebar.Item href="dashboard?tab=statistics" icon={HiUser}>
                Stats
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup className="dark:bg-black">
              <div onClick={handleSignOut}>
                <Sidebar.Item href="#" icon={HiChartPie}>
                  Sign Out
                </Sidebar.Item>
              </div>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>
    </div>
  );
}

export default DashLeftSIdeBar;
