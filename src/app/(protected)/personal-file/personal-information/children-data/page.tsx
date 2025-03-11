"use server";

import React from "react";
import { ContentData } from "./content-data";

const Page = () => {
  return (
    <div className="flex justify-center py-2 w-full">
      <ContentData />
    </div>
  );
};

export default Page;
