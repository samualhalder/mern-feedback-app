import { Button } from "flowbite-react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInSuccesfull } from "../redux/user/userSlice";

function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const googleResult = await signInWithPopup(auth, provider);

      const response = await fetch("/api/auth/oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: googleResult.user.displayName,
          email: googleResult.user.email,
          photoURL: googleResult.user.photoURL,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // localStorage.setItem("feedback-user", JSON.stringify(data));
        dispatch(signInSuccesfull(data));
        navigate("/");
      }
    } catch (error) {
      console.log("error is ", error);
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
