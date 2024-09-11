import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

function Home() {
  const { currentUser } = useSelector((state: RootState) => state.user);
  return (
    <div className=" h-screen dark:text-white">
      <div className=" relative w-full h-full p-2 flex flex-col justify-center  items-center overflow-hidden">
        <div className=" absolute h-72 w-72 rounded-full bg-purple-600 top-25 left-25 opacity-30 blur-xl mix-blend-multiply animate-blob delay-5000"></div>
        <div className=" absolute h-72 w-72 rounded-full bg-yellow-600 top-20 left-85 opacity-30 blur-xl mix-blend-multiply animate-blob delay-200"></div>
        <div className=" absolute h-72 w-72 rounded-full bg-pink-600 bottom-80 right-70 opacity-30 blur-xl mix-blend-multiply animate-blob  delay-40"></div>
        <div className="text-7xl font-bold ">
          <h1 className="text-[#155E75] md:text-8xl anime font-mono">
            take feedback with{" "}
          </h1>
          <div className="self-center whitespace-nowrap text-6xl md:text-8xl font-semibold dark:text-white my-2 md:my-10 anime del-5">
            FeedBack{" "}
            <span className=" bg-[#FE9903] px-1 py rounded-md text-black">
              hub
            </span>
          </div>
        </div>
        <div className=" anime del-7 text-start m-4">
          <p className="text-xl text-gray-400 ">
            Collecting feedback from your users is now easier than ever, and you
            can showcase it to others with our complimentary service.
          </p>
        </div>
        <div className="m-4 anime del-10">
          {currentUser ? (
            <Link to="/dashboard">
              <Button className="text-3xl rounded-3xl" size={"xl"}>
                get started
              </Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button className="text-3xl rounded-3xl" size={"xl"}>
                Sign in
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
