"use server";

import React from "react";

import { ContentData } from "./content-data";

const page = () => {
  return (
    <div className="flex justify-center py-2 w-full">
      <ContentData />
    </div>
  );
};

export default page;
