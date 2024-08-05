import { useEffect, useState } from "react";
import DashLeftSIdeBar from "../components/DashLeftSIdeBar";
import { useLocation } from "react-router-dom";

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
    <div className="min-h-screen dark:text-white flex ">
      <div className="w-[30%] ">
        <DashLeftSIdeBar />
      </div>
      <div>RightSideBar</div>
    </div>
  );
}

export default DashBoard;
