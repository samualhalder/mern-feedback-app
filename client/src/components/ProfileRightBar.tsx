import {
  Button,
  Checkbox,
  Datepicker,
  HR,
  Label,
  Select,
  TextInput,
} from "flowbite-react";
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
      <form className="mt-5 p-5">
        <div className="flex flex-col lg:flex-row justify-around items-center my-10">
          <div>
            <Label>your first name</Label>
            <TextInput
              className="mt-1"
              size={30}
              style={{
                width: "250px",
              }}
            ></TextInput>
          </div>
          <div>
            <Label>your second name</Label>
            <TextInput
              className="mt-1"
              size={30}
              style={{
                width: "250px",
              }}
            ></TextInput>
          </div>
          <div>
            <Label>your gender</Label>
            <Select
              className="mt-1"
              id="gender"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </Select>
          </div>
        </div>
        <HR />
        <div className="flex flex-col lg:flex-row  justify-around items-center my-10">
          <div>
            <Label>age group</Label>
            <Select
              className="mt-1"
              id="gender"
              style={{
                width: "250px",
              }}
              required
            >
              <option>{"<10"}</option>
              <option>{"11-20"}</option>
              <option>{"21-40"}</option>
              <option>{">40"}</option>
            </Select>
          </div>
          <div>
            <Label>profession</Label>
            <Select
              className="mt-1"
              id="gender"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Student</option>
              <option>job seeker</option>
              <option>Corporate</option>
              <option>Government service</option>
              <option>Bussiness</option>
              <option>Self employed</option>
              <option>Solical media creator</option>
              <option>Others</option>
            </Select>
          </div>
          <div>
            <Label>Rigion</Label>
            <Select
              className="mt-1"
              id="gender"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Asia</option>
              <option>Europe</option>
              <option>Africa</option>
              <option>America</option>
            </Select>
          </div>
        </div>
        <HR />
        <div className="flex flex-col lg:flex-row  justify-around items-center my-10">
          <div>
            <Label>Marage Status</Label>
            <Select
              className="mt-1"
              id="gender"
              style={{
                width: "250px",
              }}
              required
            >
              <option>Maried</option>
              <option>Divorce</option>
              <option>Single</option>
            </Select>
          </div>
          <div>
            <Label>Poletical View</Label>
            <Select
              className="mt-1"
              id="gender"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Left</option>
              <option>Right</option>
              <option>Center</option>
              <option>Dont want to share</option>
            </Select>
          </div>
          <div>
            <Label>Relagion</Label>
            <Select
              className="mt-1"
              id="gender"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Chistian</option>
              <option>Sikh</option>
              <option>Atheist</option>
            </Select>
          </div>
        </div>
        <HR />
        <div>
          <Checkbox />
          <Label className="mx-2">I am ready to share my data.</Label>
        </div>
        <div className="mt-5 flex justify-center">
          <Button>Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileRightBar;
