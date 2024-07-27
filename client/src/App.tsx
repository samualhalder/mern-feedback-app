import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SingIn";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signInSuccesfull } from "./redux/user/userSlice";

function App() {
  const dispatch = useDispatch();
  const storedUser = localStorage.getItem("feedback-user");
  useEffect(() => {
    if (storedUser) dispatch(signInSuccesfull(JSON.parse(storedUser)));
  }, []);
  return (
    <div className="dark:bg-black">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
