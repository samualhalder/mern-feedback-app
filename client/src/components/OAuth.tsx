import { Button } from "flowbite-react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";

function OAuth() {
  const auth = getAuth(app);
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const googleResult = await signInWithPopup(auth, provider);
      console.log(googleResult);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button className="w-full" color={"green"} onClick={handleClick}>
        <FcGoogle size={25} className="mx-4" />
        Continue with google
      </Button>
    </div>
  );
}

export default OAuth;
