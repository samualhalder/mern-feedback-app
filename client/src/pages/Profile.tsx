import { useDispatch, useSelector } from "react-redux";
import { CiMail } from "react-icons/ci";
import { useEffect, useState } from "react";

import { Alert, FileInput, Spinner, Toast } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { Button, TextInput } from "flowbite-react";
import { signInSuccesfull } from "../redux/user/userSlice";

import { useNavigate } from "react-router-dom";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>();
  const [imageFileURL, setImageFileURL] = useState<string | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [fileTransferError, setFileTransferError] = useState<string | null>(
    null
  );
  const [fileTransferPersantage, setFileTransferPersantage] = useState<
    number | null
  >(null);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  // check user is valid or not
  useEffect(() => {
    const user = localStorage.getItem("feedback-user");
    if (!user) {
      navigator("/signin");
    }
  }, []);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImageFileURL(url);
    }
  };

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
        }
        setLoading(false);
      };
      fetchingFunction();
      setShowForm((pre) => !pre);
    } catch (error) {
      setLoading(false);
      setError(error);
      setShowForm((pre) => !pre);
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  useEffect(() => {
    setFormData({ ...formData, photoURL: imageFileURL });
  }, [imageFileURL]);

  const uploadImage = async () => {
    setPhotoUploading(true);
    setFileTransferError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress: number =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileTransferPersantage(+progress.toFixed(0));
      },
      (error) => {
        setFileTransferError(
          "Could not upload the image (size may be more than 2 MB )"
        );
        setFileTransferPersantage(null);
        setImageFile(null);
        setImageFileURL(null);
        setPhotoUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, photoURL: downloadURL });
          setFileTransferPersantage(null);
          setPhotoUploading(false);
        });
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:text-white">
      {/* left */}
      <div className="flex flex-col items-center gap-5 border-2 border-cyan-500 rounded-md md:w-[30%] m-4 p-3">
        <h1 className="text-5xl dark:text-white mx-auto my-3">Profile</h1>
        <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          {fileTransferPersantage && (
            <CircularProgressbar
              value={fileTransferPersantage || 0}
              text={`${fileTransferPersantage}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${fileTransferPersantage / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileURL || currentUser.photoURL}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${
              fileTransferPersantage &&
              fileTransferPersantage < 100 &&
              "opacity-60"
            }`}
          />
        </div>

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

            <FileInput
              accept="image/*"
              onChange={handlePhotoChange}
              helperText="SVG, PNG, JPG or GIF (MAX SIZE 2MB)."
            />

            {fileTransferError && (
              <Alert color={"failure"}>{fileTransferError}</Alert>
            )}
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
