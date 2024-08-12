import React from "react";
import { TbError404 } from "react-icons/tb";

function PageNotFound() {
  return (
    <div className="h-screen dark:text-white flex flex-col justify-center items-center">
      <TbError404 className="text-9xl" />
      <h1 className="text-5xl">{"<Page Not Found/>"}</h1>
    </div>
  );
}

export default PageNotFound;
