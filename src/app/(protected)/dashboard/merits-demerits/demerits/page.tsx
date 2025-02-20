"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cargos } from "@/db/index";
import { useState } from "react";

const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const schema = z.object({
  dependenciaOficina: z.string().nonempty("Dependencia oficina es obligatorio"),
  cargo: z.string().nonempty("Cargo es obligatorio"),
  docuemntoSustento: z.string().nonempty("Documento sustento es obligatorio"),
  tipoSancion: z.string().nonempty("Tipo de sanción es obligatorio"),
  fechaSancion: z.string().nonempty("Fecha de sanción es obligatoria").regex(dateRegex, "Formato de fecha inválido (dd/mm/yyyy)"),
  status: z.string().nonempty("Status es obligatorio"),
});

type IForm = z.infer<typeof schema>;

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: zodResolver(schema),
  });

  const [filteredCargos, setFilteredCargos] = useState(cargos);

  const handleCargoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase();
    setFilteredCargos(cargos.filter((cargo) => cargo.nombre.toLowerCase().includes(searchTerm)));
  };

  const onSubmit: SubmitHandler<IForm> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <label htmlFor="dependenciaOficina">Dependencia Oficina</label>
        <input type="text" {...register("dependenciaOficina")} />
        {errors.dependenciaOficina && <p>{errors.dependenciaOficina.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="cargo">Cargo</label>
        <input type="text" {...register("cargo")} onChange={handleCargoChange} />
        {errors.cargo && <p>{errors.cargo.message}</p>}
        <ul className="hidden">
          {filteredCargos.map((cargo) => (
            <li key={cargo.id}>{cargo.nombre}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="docuemntoSustento">Documento Sustento</label>
        <input type="text" {...register("docuemntoSustento")} />
        {errors.docuemntoSustento && <p>{errors.docuemntoSustento.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="tipoSancion">Tipo de Sanción</label>
        <select {...register("tipoSancion")}>
          <option value="">Seleccione una opción</option>
          <option value="sgh">Sin goce de haberes</option>
          <option value="amonestacion">Amonestación</option>
          <option value="abandono">Papeleta de abandono</option>
        </select>
        {errors.tipoSancion && <p>{errors.tipoSancion.message}</p>}
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="fechaSancion">Fecha de Sanción (dd/mm/yyyy)</label>
        <input type="text" {...register("fechaSancion")} placeholder="dd/mm/yyyy" />
        {errors.fechaSancion && <p>{errors.fechaSancion.message}</p>}
      </div>

      <button type="submit" className="bg-[#e64553] p-2 rounded text-white">
        Enviar
      </button>
    </form>
  );
};

export default Page;
