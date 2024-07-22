import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { redirect, useNavigate } from "react-router-dom";

type From = {
  name?: string;
  email?: string;
  password?: string;
};
function SignUp() {
  const [formData, setFormData] = useState<From | null>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(false);
    setErrorMessage(null);

    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        navigate("/signin");
      } else {
        setLoading(false);
        setErrorMessage(data.errMessege);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex flex-col md:flex-row justify-around h-screen">
      {/* left */}
      <div className=" md:w-[50%] p-5 flex flex-col justify-center items-center">
        <h1 className="text-3xl">Feedback</h1>
        <p className="text-sm text-gray-600">
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
          <h1 className="  text-3xl">Sign Up</h1>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              onChange={(e) => handleChange(e)}
              id="name"
              type="text"
              placeholder="John Dow"
              required
            />
          </div>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              onChange={(e) => handleChange(e)}
              id="email"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              onChange={(e) => handleChange(e)}
              id="password"
              type="password"
              required
            />
          </div>

          <Button type="submit" className="w-[70%]" disabled={loading}>
            {!loading ? "Sign Up" : <Spinner />}
          </Button>

          {errorMessage && (
            <Alert color={"failure"} className="w-[70%]">
              {errorMessage}
            </Alert>
          )}
          <h1>OR</h1>
          <Button className="w-[70%]" color={"green"}>
            <FcGoogle size={25} className="mx-4" />
            Continue with google
          </Button>
          <p>
            already have an account?{" "}
            <a href="/signin" className="text-blue-600 cursor-pointer">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
