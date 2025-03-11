import React from "react";
import { DocComponent } from "./doc-component";

const page = async () => {
  return (
    <div className="flex flex-row justify-center mt-5 w-full">
      <div className="flex w-4/5">
        <DocComponent />
      </div>
    </div>
  );
};

export default page;
