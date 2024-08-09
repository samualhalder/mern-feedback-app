import { useEffect, useState } from "react";
import DashLeftSIdeBar from "../components/DashLeftSIdeBar";
import { useLocation } from "react-router-dom";
import DashCreatePost from "./DashCreatePost";
import DashAllPosts from "./DashAllPosts";
import DashAllFeedbacks from "./DashAllFeedbacks";
import DashStatistics from "./DashStatistics";

function DashBoard() {
  const [tab, setTab] = useState<string | null>("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabValue = params.get("tab");
    setTab(tabValue);
  }, [location.search]);
  console.log(tab);

  return (
    <div className="min-h-screen dark:text-white flex flex-col sm:flex-row">
      <div className="h-[100%] md:w-[30%] ">
        <DashLeftSIdeBar />
      </div>
      <div className="md:w-[70%]">
        {tab === null ? <DashCreatePost /> : null}
        {tab === "all-posts" ? <DashAllPosts /> : null}
        {tab === "all-feedbacks" ? <DashAllFeedbacks /> : null}
        {tab === "analytics" ? <DashStatistics /> : null}
      </div>
    </div>
  );
}

export default DashBoard;
