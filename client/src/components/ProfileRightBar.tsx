import { Datepicker, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";

function ProfileRightBar() {
  const [date, setdate] = useState(new Date().toLocaleDateString());
  console.log(date);

  return (
    <div className="dark:text-white flex flex-col">
      <div className="mx-auto">
        <h1 className="mx-auto  text-5xl">Additional Information</h1>
        <p className="">please fill all the fields to give your feedbacks.</p>
      </div>
      <div className="mt-5 p-5">
        <div className="flex justify-around">
          <div>
            <Label>your first name</Label>
            <TextInput className="mt-1" size={30}></TextInput>
          </div>
          <div>
            <Label>your second name</Label>
            <TextInput className="mt-1" size={30}></TextInput>
          </div>
          <div>
            <Label>your gender</Label>
            <Select className="mt-1" id="gender" sizing={30} required>
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </Select>
          </div>
        </div>
        <div className="flex justify-around">
          <div>
            <Label>age group</Label>
            <Select className="mt-1" id="gender" sizing={30} required>
              <option>{"<10"}</option>
              <option>{"11-20"}</option>
              <option>{"21-40"}</option>
              <option>{">40"}</option>
            </Select>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default ProfileRightBar;
