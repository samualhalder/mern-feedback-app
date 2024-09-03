import { Button, HR, TextInput } from "flowbite-react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { qs } from "../pages/DashCreatePost";
import { useState } from "react";

function AddQst({
  params,
}: {
  params: {
    qsArrey: qs[];
    setQsArrey: (value: qs[]) => void;
  };
}) {
  const [question, setQuestion] = useState<string>("");
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const addQuestion = () => {
    if (isEditing) {
      const newArrye: qs[] = params.qsArrey.map((elm) =>
        elm.id === isEditing ? { ...elm, question: question } : elm
      );
      params.setQsArrey([...newArrye]);
      setIsEditing(null);
    } else {
      const newQst: qs = {
        id: Date.now(),
        question: question,
      };
      params.setQsArrey([...params.qsArrey, newQst]);
    }
    setQuestion("");
  };
  const handleEdit = (id: number) => {
    setIsEditing(id);
    const editedQuestion = params.qsArrey.filter((qs) => qs.id === id);
    setQuestion(editedQuestion[0].question);
  };
  const handleDelete = (id: number) => {
    const index = params.qsArrey.findIndex((elm) => elm.id === id);
    params.qsArrey.splice(index, 1);
    params.setQsArrey([...params.qsArrey]);
  };
  return (
    <div className="flex flex-col w-full border-2 border-cyan-400 p-3">
      <div className="w-full flex justify-between">
        <TextInput
          className="w-[90%]"
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button className="flex items-center" onClick={addQuestion}>
          {!isEditing ? <FaPlus /> : "save"}
        </Button>
      </div>
      <HR />
      <div>
        {params.qsArrey.map((qs, ind) => (
          <div
            key={ind}
            className="text-xl flex flex-col md:flex-row gap-1 justify-between border-2 border-cyan-200 p-4 m-2 rounded-3xl"
          >
            <p>{qs.question}</p>
            <div className="flex gap-2 ">
              <Button color={"red"} onClick={() => handleDelete(qs.id)}>
                <FaTrash />
              </Button>
              <Button color={"yellow"} onClick={() => handleEdit(qs.id)}>
                <FaEdit />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddQst;
