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
  Toast,
} from "flowbite-react";
import { useParams } from "react-router-dom";
import AddQst from "../components/AddQst";

import { useEffect, useState } from "react";
import { formDataType, qs } from "./DashCreatePost";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { HiCheck } from "react-icons/hi";

export default function PostEditPage() {
  const { postId } = useParams();
  const [qsArrey, setQsArrey] = useState<qs[]>([]);
  const [formUploading, setFormUploading] = useState(false);
  const [editSuccesMessage, setEditSuccesMessage] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fileTransferError, setFileTransferError] = useState<string | null>(
    null
  );
  const [fileTransferPersantage, setFileTransferPersantage] = useState<
    number | null
  >(null);
  const [formData, setFormData] = useState<formDataType>({
    title: "",

    description: "",
    link: "",
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
    if (!imageFile) return;
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
      () => {
        setFileTransferError(
          "Could not upload the image (size may be more than 2 MB )"
        );

        setFileTransferPersantage(null);
        setImageFile(null);
        setImageFileURL("");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, photoURL: downloadURL });
          setFileTransferPersantage(null);
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
    setEditSuccesMessage(null);
    setErrorMessage(null);
    try {
      const response = await fetch(`/api/post/edit-post/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setEditSuccesMessage("post edited succesfully.");
        console.log(data);
      } else {
        setErrorMessage(data.errorMessage);
      }
    } catch (error) {
      setErrorMessage("some thing went wrong.");
    }
    setFormUploading(false);
  };

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/post/get-one-post/${postId}`);
      const data = await response.json();
      if (response.ok) {
        setFormData({
          title: data.title,
          description: data.description,
          link: data.link,
          mode: data.mode,
          questions: data.questions,
        });
        setQsArrey(data.questions);
        setImageFileURL(data.photoURL);
      }
    } catch (error) {
      console.log(error);
    }
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
  useEffect(() => {
    fetchPost();
  }, []);
  console.log("form data", formData);

  return (
    <div className="min-h-screen dark:text-white flex flex-col">
      <h1 className="mx-auto text-4xl font-bold">Edit Post</h1>
      <div className="w-full m-5 md:w-[700px] mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Title" />
            </div>
            <TextInput
              onChange={(e) => handleChange(e)}
              value={formData.title}
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
              value={formData.description}
              name="description"
              rows={5}
            />
          </div>
          <div className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Link related your project" />
            </div>
            <TextInput
              name="link"
              onChange={(e) => handleChange(e)}
              value={formData.link}
            />
          </div>
          {imageFileURL && (
            <div className="flex justify-center m-4 relative h-[500px]">
              <img src={imageFileURL || formData?.photoURL} alt="image" />
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
                  value={"public"}
                  onChange={(e) => handleChange(e)}
                  defaultChecked={formData.mode === "public"}
                />
                <Label htmlFor="united-state">Public</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  name="mode"
                  value="private"
                  defaultChecked={formData.mode === "private"}
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
          <div className="flex flex-col justify-center items-center mt-5 gap-3">
            <Button type="submit" disabled={formUploading}>
              {!formUploading ? "Edit" : <Spinner />}
            </Button>
            {errorMessage && <Alert color={"failure"}>{errorMessage}</Alert>}
            {editSuccesMessage && (
              <Toast>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <HiCheck className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">
                  {editSuccesMessage}
                </div>
                <Toast.Toggle />
              </Toast>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
