import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiInbox,
  HiChartPie,
  HiViewBoards,
  HiUser,
  HiShoppingBag,
  HiArrowSmRight,
  HiTable,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";

function DashLeftSIdeBar() {
  const [tab, setTab] = useState<string | null>("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabValue = params.get("tab");
    setTab(tabValue);
  }, [location.search]);
  console.log(tab);
  return (
    <div className="min-h-screen dark:text-white dark:bg-black">
      <Sidebar className=" dark:bg-black w-full">
        <Sidebar.Items className="dark:bg-black min-h-screen">
          <Sidebar.ItemGroup className="h-full dark:bg-black">
            <Sidebar.Item href="#" icon={HiChartPie}>
              New Post
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards}>
              All Posts
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox}>
              FeedBacks
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser}>
              Stats
            </Sidebar.Item>
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup className="border-black">
            <Sidebar.Item href="#" icon={HiChartPie}>
              Sign Out
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}

export default DashLeftSIdeBar;
