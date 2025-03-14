"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const SearchField = ({
  description,
  placeholder = "Buscar ...",
  onSearch,
  value,
}: {
  description: string;
  placeholder?: string;
  onSearch: (search: string) => void;
  value: string;
}) => {
  return (
    <div className="flex flex-col gap-2 pb-4 w-full">
      <div className="relative w-full">
        <Search className="top-1/2 left-3 absolute text-text -translate-y-1/2 transform" />
        <Input className="bg-mantle pl-10 w-full text-text" placeholder={placeholder} value={value} onChange={(e) => onSearch(e.target.value)} />
      </div>
      <p className="font-special font-semibold text-xs italic">{description}</p>
    </div>
  );
};
