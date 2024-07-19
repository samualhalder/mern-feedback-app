import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SingIn";

function App() {
  return (
    <>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
