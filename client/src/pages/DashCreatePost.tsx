import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaPlus, FaMinus, FaQuestionCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
function DashCreatePost() {
  const [qsCount, setQsCount] = useState<number>(0);
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
          {qsCount > 0 &&
            [...Array(qsCount)].map((x, i) => (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="base" value={`question ${i + 1}`} />
                </div>
                <div className="">
                  <TextInput
                    id="base"
                    className="inline"
                    icon={FaQuestionCircle}
                  />
                </div>
              </div>
            ))}
          <div className="flex justify-center items-center m-5 gap-2">
            <Button
              onClick={() => setQsCount((pre) => (pre < 5 ? pre + 1 : pre))}
              className={`${qsCount >= 5 ? " hidden" : ""}`}
            >
              Add question <FaPlus size={20} className="mx-3" />
            </Button>
            <Button
              onClick={() => setQsCount((pre) => (pre > 0 ? pre - 1 : pre))}
              color={"red"}
              className={`${qsCount == 0 ? " hidden" : ""}`}
            >
              Remove question <FaMinus size={20} className="mx-3" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashCreatePost;
