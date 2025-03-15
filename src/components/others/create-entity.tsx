import { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

type CreateEntityProps = {
  title: string;
  icon: ReactNode;
  buttonText: string;
};

export const CreateEntity = ({ title, icon, buttonText }: CreateEntityProps) => {
  return (
    <div className="flex flex-col gap-2 bg-mantle mb-5 p-4 border hover:border-red border-base rounded-lg w-full">
      <div className="flex flex-row items-center gap-2 hover:text-red">
        <p className="font-inter font-semibold uppercase">{title}</p>
        <CircleAlert size={18} />
      </div>

      <div className="flex flex-row items-end gap-2">
        <div className="items-center gap-2 grid w-full">
          <Label htmlFor="file" className="font-semibold capitalize">
            subir archivo
          </Label>
          <Input id="file" type="file" className="cursor-pointer" />
        </div>

        <Button className="font-special text-base">
          {icon}
          <p>{buttonText}</p>
        </Button>
      </div>

      <div className="flex flex-row gap-2 font-special text-xs">
        <Link href="/dashboard/doc" className="hover:font-semibold hover:text-mauve cursor-pointer">
          Conocer más
        </Link>
        <span>acerca del registro de datos?</span>
      </div>
    </div>
  );
};
