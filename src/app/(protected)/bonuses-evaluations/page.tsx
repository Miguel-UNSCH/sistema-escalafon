"use server";

import React from "react";
import { ContentPage } from "./content-page";

const page = () => {
  return (
    <div className="flex justify-center py-2 w-full">
      <ContentPage />
    </div>
  );
};

export default page;
