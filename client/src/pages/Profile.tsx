import { useDispatch, useSelector } from "react-redux";
import { CiMail } from "react-icons/ci";
import { ChangeEvent, useRef, useState } from "react";

import { Spinner, Toast } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";

import { Button, TextInput } from "flowbite-react";
import { signInSuccesfull } from "../redux/user/userSlice";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleEdit = () => {
    setLoading(true);
    setError(null);
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
          setShowToast(true);
          dispatch(signInSuccesfull(data));
        } else {
          setError(data.errMessege);
          setLoading(false);
        }
      };
      fetchingFunction();
      setShowForm((pre) => !pre);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
      setShowForm((pre) => !pre);
    }
  };
  console.log(formData);

  return (
    <div className="h-screen flex flex-col md:flex-row dark:text-white">
      {/* left */}
      <div className="flex flex-col items-center gap-5 border-2 border-cyan-500 rounded-md md:w-[30%] m-4">
        <h1 className="text-5xl dark:text-white mx-auto my-3">Profile</h1>
        <img
          className="h-[100px] rounded-full overflow-hidden"
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
          {showForm && (
            <Button onClick={handleEdit} disabled={loading}>
              {loading ? <Spinner /> : "save"}
            </Button>
          )}
          {showForm && (
            <Button color={"red"} onClick={() => setShowForm((pre) => !pre)}>
              Cancel
            </Button>
          )}
        </div>
        {showToast && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">
              user updated successfully.
            </div>
            <Toast.Toggle />
          </Toast>
        )}
        {error && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle />
          </Toast>
        )}
      </div>
      {/* right */}
      <div>
        <p>its side bar</p>
      </div>
    </div>
  );
}

export default Profile;
