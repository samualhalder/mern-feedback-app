import { useEffect, useState } from "react";
import DashLeftSIdeBar from "../components/DashLeftSIdeBar";
import { useLocation } from "react-router-dom";
import DashCreatePost from "./DashCreatePost";
import DashAllPosts from "./DashAllPosts";
import DashAllFeedbacks from "./DashAllFeedbacks";

import DashAnalytics from "./DashAnalytics";

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
    <div className="min-h-screen dark:text-white flex flex-col md:flex-row justify-between">
      <div className=" md:w-[30%] mb-2 md:fixed ">
        <DashLeftSIdeBar />
      </div>
      <div className="min-w-[70%] md:w-full flex justify-center md:justify-end">
        <div className="md:w-[70%] flex justify-center">
          {tab === null ? <DashCreatePost /> : null}
          {tab === "all-posts" ? <DashAllPosts /> : null}
          {tab === "all-feedbacks" ? <DashAllFeedbacks /> : null}
          {tab === "analytics" ? <DashAnalytics /> : null}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
