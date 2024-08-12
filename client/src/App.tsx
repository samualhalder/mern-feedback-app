import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SingIn";
import Profile from "./pages/Profile";

import { useDispatch } from "react-redux";
import { signInSuccesfull, signOut } from "./redux/user/userSlice";
import checkUser from "./redux/user/checkUser";
import DashBoard from "./pages/DashBoard";
import Post from "./pages/Post";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const dispatch = useDispatch();

  checkUser();
  const storedUser = localStorage.getItem("feedback-user");
  if (storedUser) dispatch(signInSuccesfull(JSON.parse(storedUser)));
  else {
    dispatch(signOut());
  }

  return (
    <div className="dark:bg-black">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/dashboard" element={<DashBoard />}></Route>
          <Route path="/post/:postId" element={<Post />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
