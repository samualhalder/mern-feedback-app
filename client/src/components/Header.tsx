import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";

function Header() {
  const currtheme = localStorage.getItem("feed-back-theme");
  const storedUser = localStorage.getItem("feedback-user");
  const { currentUser } = useSelector((state) => state.user);
  const [theme, setTheme] = useState(currtheme);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toggleTheme = () => {
    const currTheme = localStorage.getItem("feed-back-theme");
    if (currTheme === "dark") {
      localStorage.setItem("feed-back-theme", "light");
      setTheme("light");
    } else {
      localStorage.setItem("feed-back-theme", "dark");
      setTheme("dark");
    }
  };

  const handleSignOut = () => {
    // localStorage.removeItem("feedback-user");
    dispatch(signOut());
    navigate("/signin");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <div className=" ">
      <Navbar fluid rounded className="dark:bg-black ">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            FeedBack{" "}
            <span className=" bg-[#FE9903] px-2 py-1 rounded-md text-black">
              hub
            </span>
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button className="mx-5" onClick={toggleTheme}>
            {theme === "light" ? (
              <CiDark className="text-xl"></CiDark>
            ) : (
              <CiLight className="text-xl"></CiLight>
            )}
          </Button>
          {!currentUser && (
            <a href="/signup">
              <Button className="mx-4 ">SignUp</Button>
            </a>
          )}

          {currentUser && (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={currentUser?.photoURL}
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{currentUser?.username}</span>
                <span className="block truncate text-sm font-medium">
                  {currentUser?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item href="/profile">Profile</Dropdown.Item>
              <Dropdown.Item href="/dashboard">Dashboard</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
