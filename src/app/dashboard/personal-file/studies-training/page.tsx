"use client";
import React from "react";

import { studiesTraining as formData } from "@/utils/personal-file";
import { BasicForm } from "@/components/forms/FormTypes";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col">
        <h3 className="font-bold font-montserrat text-xl uppercase">Estudios y Capacitación</h3>
        <BasicForm formData={formData} />
      </div>
    </div>
  );
};

export default page;
