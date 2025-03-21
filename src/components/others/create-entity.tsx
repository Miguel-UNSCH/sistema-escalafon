"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { CircleAlert } from "lucide-react";
import { ReactNode, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "../ui/form";
import { Button } from "@/components/ui/button";
import { uploadSchema, ZUploadS } from "@/lib/zod";
import { uploadFile } from "@/service/file-service";
import { UploadField } from "../custom-fields/upload-file";
import { ModelType, processFile } from "@/actions/process-file";

type CreateEntityProps = {
  title: string;
  icon: ReactNode;
  buttonText: string;
  model: ModelType;
};

export const CreateEntity = ({ title, icon, buttonText, model }: CreateEntityProps) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<ZUploadS>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (data: ZUploadS) => {
    startTransition(async () => {
      try {
        let file_id = "";

        if (data.file) {
          const uploadResponse = await uploadFile(data.file, "dataset");
          if (!uploadResponse.success || !uploadResponse.data) {
            toast.error(uploadResponse.message || "Error al subir el archivo.");
            return;
          }
          file_id = uploadResponse.data.id;
        }

        if (file_id) {
          try {
            const response = await processFile(file_id, model);

            if (response.success) {
              toast.success(response.message);
            } else {
              console.log(response.message);
              toast.error(response.message);
            }
          } catch (e: unknown) {
            toast.error("Error al procesar el archivo.");
          }
        }
      } catch (e: unknown) {
        toast.error("Error al subir el archivo.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 bg-mantle mb-5 p-4 border hover:border-red border-base rounded-lg w-full">
      <div className="flex flex-row items-center gap-2 hover:text-red">
        <p className="font-inter font-semibold uppercase">{title}</p>
        <CircleAlert size={18} />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-row-reverse items-end gap-2">
            <Button type="submit" disabled={isPending} className="flex flex-row items-center gap-2">
              {icon}
              {isPending ? "Guardando..." : buttonText}
            </Button>
            <div className="w-full">
              <UploadField control={form.control} name="file" label="Subir archivo" showFileName={false} allowedTypes={["json", "xlsx"]} />
            </div>
          </div>
        </form>
      </Form>

      <div className="flex flex-row gap-2 font-special text-xs">
        <Link href="/dashboard/doc" className="font-special hover:font-semibold text-mauve cursor-pointer">
          Conocer más
        </Link>
        <span>acerca del registro de datos?</span>
      </div>
    </div>
  );
};
