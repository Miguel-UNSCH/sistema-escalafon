import FormRegister from "@/components/form-register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CircleAlert } from "lucide-react";

const Page = () => {
  return (
    <div className="flex flex-col justify-between items-center gap-4 h-full font-poppins text-[#4c4f69]">
      <FormRegister />
      <div className="flex flex-col gap-2 bg-[#dce0e8] p-4 border hover:border-[#d20f39] rounded-lg">
        <div className="flex flex-row items-center gap-2 hover:text-[#e64553]">
          <p className="font-inter font-semibold text-base uppercase">registrar varios usuarios</p>
          <CircleAlert size={20} />
        </div>
        <div className="flex flex-row items-end gap-2">
          <div className="items-center gap-1.5 grid w-full max-w-sm">
            <Label htmlFor="file" className="font-semibold capitalize">
              subir archivo
            </Label>
            <Input id="file" type="file" className="cursor-pointer" />
          </div>
          <Button>crear usuarios</Button>
        </div>
        <span className="font-montserrat text-xs">
          solo se admiten archivos en formato excel, json, csv, txt [los formatos estan en la documentacion]
        </span>
      </div>
    </div>
  );
};

export default Page;
