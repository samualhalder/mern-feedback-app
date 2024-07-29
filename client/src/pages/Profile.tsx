import { useSelector } from "react-redux";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { Form } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState<boolean>(true);

  return (
    <div className="h-screen flex  dark:text-white">
      {/* left */}
      <div className="flex flex-col items-center gap-5 border-2 border-cyan-500 w-[30%]">
        <h1 className="text-5xl dark:text-white mx-auto my-3">Profile</h1>
        <img
          className="h-200 w-200 rounded-full"
          src={currentUser?.photoURL}
          alt="image"
        />
        <p>@{currentUser?.username}</p>
        <p className="items-center">
          <CiMail className="inline-block self-center m-3" />
          <span>{currentUser?.email}</span>
        </p>
        {showForm && (
          <form action="submit" className="w-full mx-8 p-5 flex flex-col gap-5">
            <TextInput value={currentUser?.username}></TextInput>
            <TextInput value={currentUser?.email}></TextInput>
            <TextInput placeholder="new password"></TextInput>
          </form>
        )}
        <Button onClick={() => setShowForm((pre) => !pre)}>
          {showForm ? "Save" : "Edit"}
        </Button>
      </div>
      {/* right */}
      <div>
        <p>its side bar</p>
      </div>
    </div>
  );
}

export default Profile;
