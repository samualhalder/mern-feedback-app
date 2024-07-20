import { Button, Label, TextInput } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
function SignUp() {
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
        <form className="h-full flex flex-col gap-4 justify-center items-center">
          <h1 className="  text-3xl">Sign Up</h1>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput id="name" type="text" placeholder="John Dow" required />
          </div>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div className="w-[70%]">
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
          </div>

          <Button type="submit" className="w-[70%]">
            Sign Up
          </Button>
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
