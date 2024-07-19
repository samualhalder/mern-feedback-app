import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { CiDark } from "react-icons/ci";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            FeetBack
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          <Button className="mx-5">
            <CiDark className="text-xl"></CiDark>
          </Button>
          <a href="/signup">
            <Button className="mx-4">SignUp</Button>
          </a>

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
