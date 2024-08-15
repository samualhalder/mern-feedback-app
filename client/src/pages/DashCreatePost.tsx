import {
  Alert,
  Button,
  FileInput,
  HR,
  Label,
  Radio,
  Spinner,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";

import AddQst from "../components/AddQst";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export type qs = {
  id: number;
  question: string;
};

export type formDataType = {
  title: string;
  username?: string;
  description: string;
  link: string;
  photoURL: string;
  mode: "public" | "private";
  questions: qs[];
};

function DashCreatePost() {
  const navigator = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [qsArrey, setQsArrey] = useState<qs[]>([]);
  const [formUploading, setFormUploading] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [fileTransferError, setFileTransferError] = useState<string | null>(
    null
  );
  const [fileTransferPersantage, setFileTransferPersantage] = useState<
    number | null
  >(null);
  const [formData, setFormData] = useState<formDataType>({
    title: "",
    username: currentUser.username,
    description: "",
    link: "",
    photoURL: "",
    mode: "public",
    questions: qsArrey,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFileURL, setImageFileURL] = useState<string>("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setImageFileURL(url);
      setFormData({ ...formData, photoURL: url });
    }
  };

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
        setImageFileURL("");
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormUploading(true);
    try {
      const response = await fetch("/api/post/create-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        navigator(`/post/${data._id}`);
        console.log(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
    setFormUploading(false);
  };
  useEffect(() => {
    setFormData({ ...formData, questions: qsArrey });
  }, [qsArrey]);
  useEffect(() => {
    setFormData({ ...formData, photoURL: imageFileURL });
  }, [imageFileURL]);
  useEffect(() => {
    uploadImage();
  }, [imageFile]);
  return (
    <div className="">
      <div className="flex justify-center items-center text-center">
        <h1 className="text-4xl">Create a new feedback post</h1>
      </div>
      <div className="m-10 p-10">
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Title" />
            </div>
            <TextInput
              onChange={(e) => handleChange(e)}
              name="title"
              type="text"
              sizing="md"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="base" value="Description" />
            </div>
            <Textarea
              onChange={(e) => handleChange(e)}
              name="description"
              rows={5}
            />
          </div>
          <div className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Link related your project" />
            </div>
            <TextInput name="link" onChange={(e) => handleChange(e)} />
          </div>
          {imageFileURL && (
            <div className="flex justify-center m-4 relative h-[500px]">
              <img src={imageFileURL} alt="image" />
              {fileTransferPersantage && fileTransferPersantage > 0 && (
                <div className="flex justify-center items-center absolute text-5xl ">
                  {fileTransferPersantage}%
                </div>
              )}
            </div>
          )}
          {fileTransferError && (
            <Alert color={"failure"}>Image size must be under 2MB</Alert>
          )}
          <div id="fileUpload" className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              onChange={handlePhotoChange}
              id="file"
              accept="image/*"
              helperText="you can upload a picture related to the feedback topic. (photo size must be under 2MB.)"
            />
          </div>
          <div>
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-4">I want to keep my form in </legend>
              <div className="flex items-center gap-2">
                <Radio
                  name="mode"
                  value="public"
                  defaultChecked
                  onChange={(e) => handleChange(e)}
                />
                <Label htmlFor="united-state">Public</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="mode"
                  value="private"
                  onChange={(e) => handleChange(e)}
                />
                <Label htmlFor="germany">Private</Label>
              </div>
            </fieldset>
          </div>
          <h1 className="flex justify-center mt-4 text-lg">
            ask some question for your feedback form
          </h1>
          {/* Add question section */}
          <div className="mt-10">
            <AddQst params={{ qsArrey, setQsArrey }} />
          </div>
          <HR />
          <div className="flex justify-center mt-5">
            <Button type="submit" disabled={formUploading}>
              {!formUploading ? "Post" : <Spinner />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashCreatePost;
