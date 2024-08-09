import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiInbox, HiChartPie, HiViewBoards, HiUser } from "react-icons/hi";
import { IoMdAdd, IoMdList } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
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
    <div className="md:min-h-screen dark:text-white ">
      <div className="">
        <Sidebar className=" w-full">
          <Sidebar.Items className=" md:min-h-screen ">
            <Sidebar.ItemGroup className="h-full ">
              <Sidebar.Item
                active={tab === null}
                href="/dashboard"
                icon={IoMdAdd}
              >
                New Post
              </Sidebar.Item>
              <Sidebar.Item
                active={tab === "all-posts"}
                href="/dashboard?tab=all-posts"
                icon={IoMdList}
              >
                All Posts
              </Sidebar.Item>
              <Sidebar.Item
                active={tab === "all-feedbacks"}
                href="/dashboard?tab=all-feedbacks"
                icon={MdFeedback}
              >
                FeedBacks
              </Sidebar.Item>
              <Sidebar.Item
                active={tab === "analytics"}
                href="dashboard?tab=analytics"
                icon={SiGoogleanalytics}
              >
                Analytics
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup className="">
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
