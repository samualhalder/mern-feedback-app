import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import AddQst from "../components/AddQst";

export type qs = {
  id: string;
  question: string;
};

function DashCreatePost() {
  const [qsArrey, setQsArrey] = useState<qs[]>([]);
  return (
    <div className="">
      <div className="flex justify-center items-center text-center">
        <h1 className="text-4xl">Create a new feedback post</h1>
      </div>
      <div className="m-10 p-10">
        <form action="">
          <div className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Title" />
            </div>
            <TextInput id="base" type="text" sizing="md" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="base" value="Description" />
            </div>
            <Textarea id="base" rows={5} />
          </div>
          <div className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="base" value="Link to your project" />
            </div>
            <TextInput id="base" />
          </div>
          <div id="fileUpload" className="my-2">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Upload file" />
            </div>
            <FileInput
              id="file"
              helperText="you can upload a picture related to the feedback topic. (photo size must be under 2MB.)"
            />
          </div>
          <h1 className="flex justify-center mt-4 text-lg">
            ask some question for your feedback form
          </h1>
          {/* Add question section */}
          <div className="mt-10">
            <AddQst params={{ qsArrey, setQsArrey }} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashCreatePost;
