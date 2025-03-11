"use server";

import React from "react";
import { FormData } from "./form-data";

const page = () => {
  return (
    <div className="flex justify-center py-2 w-full">
      <div className="flex p-2 w-4/5">
        <FormData />
      </div>
    </div>
  );
};

export default page;
