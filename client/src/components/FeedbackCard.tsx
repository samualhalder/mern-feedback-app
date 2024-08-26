import { useSelector } from "react-redux";
import { FeedbackType } from "../pages/DashAllFeedbacks";
import { IoStar } from "react-icons/io5";
import { BsDot } from "react-icons/bs";

export default function FeedbackCard({ feedback }: { feedback: FeedbackType }) {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="h-40 w-[400px] border-2 border-cyan-400 flex flex-col rounded-md m-2 p-2 gap-4">
      <div className="flex gap-3 items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden">
          <img src={currentUser.photoURL} alt="photo" />
        </div>
        <p className=" font-semibold">{currentUser.username} </p>
        <BsDot />
        <p>{new Date(feedback.createdAt).toDateString()}</p>
      </div>
      <div className="flex flex-col justify-between h-full">
        <p className=" truncate h-full">{feedback.feedback}</p>
        <h1 className="flex items-center">
          <IoStar className="inline" />
          {feedback.ratings}
        </h1>
      </div>
    </div>
  );
}
