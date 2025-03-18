"use server";

import React from "react";
import { ContentData } from "./content-data";

const page = () => {
  return (
    <div className="flex justify-center px-4 md:px-8 lg:px-16 py-2 w-full">
      <ContentData />
    </div>
  );
};

export default page;
