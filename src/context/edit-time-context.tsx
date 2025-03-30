"use client";

import React, { createContext, useContext, useState } from "react";

type EditTimeContextType = {
  version: number;
  updateVersion: () => void;
};

const EditTimeContext = createContext<EditTimeContextType | undefined>(undefined);

export const EditTimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [version, setVersion] = useState(0);

  const updateVersion = () => setVersion((prev) => prev + 1);

  return <EditTimeContext.Provider value={{ version, updateVersion }}>{children}</EditTimeContext.Provider>;
};

export const useEditTime = () => {
  const context = useContext(EditTimeContext);
  if (!context) {
    throw new Error("useEditTime debe usarse dentro de EditTimeProvider");
  }
  return context;
};
