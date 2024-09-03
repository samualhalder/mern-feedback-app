import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";

import { BsFacebook, BsTwitterX, BsInstagram } from "react-icons/bs";

function FooterComp() {
  const theme = localStorage.getItem("feed-back-theme");
  console.log("theme", theme);

  return (
    <Footer className="border border-t-8 border-teal-400 h-full p-10 bg-white drak:bg-[#1F2937]">
      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-[#1F2937]">
        <div>
          <div>
            <Link
              to={"/"}
              className="whitespace-nowrap text-sm sm:text-lg self-center"
            >
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                FeedBack{" "}
                <span className=" bg-[#FE9903] px-2 py-1 rounded-md text-black">
                  hub
                </span>
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 mt-4 sm:gap-10">
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/samualhalder"
                  target="_blanck"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/samual-halder-464b8820a/"
                  target="_blanck"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Follow Us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://twitter.com/samualhalder"
                  target="_blanck"
                >
                  twitter
                </Footer.Link>
                <Footer.Link
                  href="https://www.linkedin.com/in/samual-halder-464b8820a/r"
                  target="_blanck"
                >
                  LinkedIn
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" target="_blanck">
                  Privacy Policy
                </Footer.Link>
                <Footer.Link href="#" target="_blanck">
                  Terms & Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="grid grid-rows-2 sm:flex sm:justify-between">
          <Footer.Copyright
            by="Samual Halder"
            href="https://www.linkedin.com/in/samual-halder-464b8820a/"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-3 mt-3">
            <Footer.Icon
              href="https://www.facebook.com/samual1six"
              target="_blanck"
              icon={BsFacebook}
            />
            <Footer.Icon
              href="https://www.twitter.com/samualhalder/"
              target="_blanck"
              icon={BsTwitterX}
            />
            <Footer.Icon
              href="https://www.instagram.com/samualhalder/"
              target="_blanck"
              icon={BsInstagram}
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}

export default FooterComp;
