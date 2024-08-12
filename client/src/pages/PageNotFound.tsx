import React from "react";
import { TbError404 } from "react-icons/tb";

function PageNotFound({ message }: { message: string }) {
  return (
    <div className="h-screen dark:text-white flex flex-col justify-center items-center">
      <TbError404 className="text-9xl" />
      <h1 className="text-5xl">{`<${message}/>`}</h1>
    </div>
  );
}

export default PageNotFound;
