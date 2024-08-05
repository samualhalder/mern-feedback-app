import {
  Button,
  Checkbox,
  HR,
  Label,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
type formDataType = {
  firstName?: string;
  secondName?: string;
  gender?: string;
  ageGroup?: string;
  profession?: string;
  region?: string;
  marriageStatus?: string;
  politicalView?: string;
  religion?: string;
};

function ProfileRightBar() {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [termAgred, setTermAgred] = useState<boolean>(false);

  const [formData, setFormData] = useState<formDataType>({});
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!termAgred) return;
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/user/updateUser/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("succes", data);
      } else {
        console.log("failure", data);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(formData);

  return (
    <div className="dark:text-white flex flex-col">
      <div className="mx-auto">
        <h1 className="mx-auto  text-5xl">Additional Information</h1>
        <p className="">please fill all the fields to give your feedbacks.</p>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className="mt-5 p-5">
        <div className="flex flex-col lg:flex-row justify-around items-center my-10">
          <div>
            <Label>your first name</Label>
            <TextInput
              className="mt-1"
              size={30}
              required
              id="firstName"
              onChange={(e) => handleChange(e)}
              style={{
                width: "250px",
              }}
            ></TextInput>
          </div>
          <div>
            <Label>your second name</Label>
            <TextInput
              className="mt-1"
              onChange={(e) => handleChange(e)}
              required
              size={30}
              id="secondName"
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
              onChange={(e) => handleChange(e)}
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Chose one</option>
              <option value={"male"}>Male</option>
              <option value={"female"}>Female</option>
              <option value={"others"}>Others</option>
            </Select>
          </div>
        </div>
        <HR />
        <div className="flex flex-col lg:flex-row  justify-around items-center my-10">
          <div>
            <Label>age group</Label>
            <Select
              className="mt-1"
              onChange={(e) => handleChange(e)}
              id="ageGroup"
              style={{
                width: "250px",
              }}
              required
            >
              <option>Chose one</option>
              <option value={"<10"}>{"<10"}</option>
              <option value={"10-20"}>{"10-20"}</option>
              <option value={"21-40"}>{"21-40"}</option>
              <option value={">40"}>{">40"}</option>
            </Select>
          </div>
          <div>
            <Label>profession</Label>
            <Select
              className="mt-1"
              onChange={(e) => handleChange(e)}
              id="profession"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Chose one</option>
              <option value={"student"}>Student</option>
              <option value={"job seeker"}>job seeker</option>
              <option value={"corporate"}>Corporate</option>
              <option value={"govt employee"}>Government service</option>
              <option value={"business"}>Bussiness</option>
              <option value={"self employed"}>Self employed</option>
              <option value={"solcial media creator"}>
                Solical media creator
              </option>
              <option value={"onthers"}>Others</option>
            </Select>
          </div>
          <div>
            <Label>Region</Label>
            <Select
              className="mt-1"
              onChange={(e) => handleChange(e)}
              id="region"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Chose one</option>
              <option value={"asia"}>Asia</option>
              <option value={"europe"}>Europe</option>
              <option value={"africa"}>Africa</option>
              <option value={"america"}>America</option>
            </Select>
          </div>
        </div>
        <HR />
        <div className="flex flex-col lg:flex-row  justify-around items-center my-10">
          <div>
            <Label>Marriage Status</Label>
            <Select
              className="mt-1"
              onChange={(e) => handleChange(e)}
              id="marriageStatus"
              style={{
                width: "250px",
              }}
              required
            >
              <option>Chose one</option>
              <option value={"married"}>Married</option>
              <option value={"divorced"}>Divorced</option>
              <option value={"unmarried"}>Unmarried</option>
              <option value={"widow"}>Widow</option>
            </Select>
          </div>
          <div>
            <Label>Political View</Label>
            <Select
              className="mt-1"
              onChange={(e) => handleChange(e)}
              id="politicalView"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Chose one</option>
              <option value={"nodata"}>Dont want to share</option>
              <option value={"left"}>Left</option>
              <option value={"right"}>Right</option>
              <option value={"center"}>Center</option>
            </Select>
          </div>
          <div>
            <Label>Relagion</Label>
            <Select
              className="mt-1"
              onChange={(e) => handleChange(e)}
              id="relagion"
              sizing={30}
              style={{
                width: "250px",
              }}
              required
            >
              <option>Chose one</option>
              <option value={"atheist"}>Atheist</option>
              <option value={"hindu"}>Hindu</option>
              <option value={"muslim"}>Muslim</option>
              <option value={"christianity"}>Christianity</option>
              <option value={"sikh"}>Sikh</option>
              <option value={"other"}>Other</option>
            </Select>
          </div>
        </div>
        <HR />
        <div>
          <Checkbox
            checked={termAgred}
            onChange={() => setTermAgred((pre) => !pre)}
          />
          <Label className="mx-2">I am ready to share my data.</Label>
        </div>
        <div className="mt-5 flex justify-center">
          <Button type="submit" disabled={!termAgred || loading}>
            {loading ? <Spinner></Spinner> : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ProfileRightBar;
