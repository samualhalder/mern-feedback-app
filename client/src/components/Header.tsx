import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";
import { useSelector } from "react-redux";

function Header() {
  const currtheme = localStorage.getItem("feed-back-theme");
  const { currentUser } = useSelector((state) => state.user);
  const [theme, setTheme] = useState(currtheme);
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
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            FeedBack
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
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Home
          </Navbar.Link>
          <Navbar.Link href="#">About</Navbar.Link>
          <Navbar.Link href="#">Services</Navbar.Link>
          <Navbar.Link href="#">Pricing</Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
