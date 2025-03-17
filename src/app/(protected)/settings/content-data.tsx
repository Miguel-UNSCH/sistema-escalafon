"use client";

import { Session } from "next-auth";
import React from "react";

export const ContentData = ({ session }: { session: Session }) => {
  return <div className="flex flex-col gap-5 p-2 w-4/5">content-data</div>;
};
