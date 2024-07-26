import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccesfull } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
type Form = {
  email: string;
  password: string;
};
function SignIn() {
  const [formData, setFormData] = useState<Form>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(signInSuccesfull(data));

        navigate("/");
      } else {
        setErrorMessage(data.errMessege);
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.errMessege);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around h-screen">
      {/* left */}
      <div className=" md:w-[50%] p-5 flex flex-col justify-center items-center">
        <h1 className="text-3xl dark:text-white">Feedback</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi, atque.
          Explicabo nostrum laboriosam eaque, ipsa quas beatae quo adipisci
          nesciunt?
        </p>
      </div>
      {/* right */}
      <div className="md:w-[50%] p-5">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="h-full flex flex-col gap-4 justify-center items-center"
        >
          <h1 className="text-3xl dark:text-white">Sign In</h1>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              onChange={handleChange}
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              onChange={handleChange}
              id="password"
              type="password"
              required
            />
          </div>

          <Button type="submit" className="w-[70%]">
            {!loading ? "Sign In" : <Spinner />}
          </Button>
          {errorMessage && (
            <Alert color={"failure"} className="w-[70%]">
              {errorMessage}
            </Alert>
          )}
          <h1 className="dark:text-white">OR</h1>
          <div className="w-[70%]">
            <OAuth />
          </div>
          <p className="dark:text-white">
            dont have an account?{" "}
            <a href="/signup" className="text-blue-600 cursor-pointer">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
