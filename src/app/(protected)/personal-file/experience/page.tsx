"use server";

import React from "react";

import { ContentData } from "./content-data";

const page = () => {
  return (
    <div className="flex justify-center w-full">
      <ContentData />
    </div>
  );
};

export default page;
