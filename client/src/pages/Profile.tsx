import { useSelector } from "react-redux";
import { CiMail } from "react-icons/ci";
import { ChangeEvent, useState } from "react";

import { Button, TextInput } from "flowbite-react";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState(null);
  const [formData, setFormData] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    setLoading(true);
    seterror(null);
    setShowForm((pre) => !pre);
    try {
      const fetchingFunction = async () => {
        const response = await fetch(
          `/api/user/updateUser/${currentUser._id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("user edit done");
        } else {
          console.log("errror");
          seterror(data.errMessage);
        }
        setLoading(false);
      };
      fetchingFunction();
    } catch (error) {
      console.log(error);
      seterror(error);
    }
  };
  console.log(formData);

  return (
    <div className="h-screen flex  dark:text-white">
      {/* left */}
      <div className="flex flex-col items-center gap-5 border-2 border-cyan-500 rounded-md w-[30%]">
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
            <TextInput
              id="username"
              onChange={(e) => handleChange(e)}
              defaultValue={currentUser?.username}
            ></TextInput>
            <TextInput
              id="email"
              onChange={(e) => handleChange(e)}
              defaultValue={currentUser?.email}
            ></TextInput>
            <TextInput
              id="password"
              onChange={(e) => handleChange(e)}
              placeholder="new password"
            ></TextInput>
          </form>
        )}
        {!showForm && (
          <Button onClick={() => setShowForm((pre) => !pre)}>Edit</Button>
        )}
        <div className="flex gap-4">
          {showForm && <Button onClick={handleEdit}>Save</Button>}
          {showForm && (
            <Button color={"red"} onClick={() => setShowForm((pre) => !pre)}>
              Cancel
            </Button>
          )}
        </div>
      </div>
      {/* right */}
      <div>
        <p>its side bar</p>
      </div>
    </div>
  );
}

export default Profile;
