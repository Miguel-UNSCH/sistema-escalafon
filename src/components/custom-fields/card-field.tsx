"use client";

import { useRouter } from "next/navigation";

export const CardField = ({ title, description, path }: { title: string; description: string; path: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(path);
  };

  return (
    <div className="flex flex-col gap-2 bg-mantle p-4 border-2 border-surface0 rounded-lg text-red hover:text-text cursor-pointer" onClick={handleClick}>
      <p className="font-primary font-bold capitalize">{title}</p>
      <p className="font-special text-subtext0 text-sm">{description}</p>
    </div>
  );
};
