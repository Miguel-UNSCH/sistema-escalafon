import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { personalSchema, ZPersonal } from "@/lib/schemas/personal.schema";
import { createPersonal, getCurrentPersonal } from "@/services/personalService";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const PersonalForm = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const [isCompleteFromDB, setIsCompleteFromDB] = useState(false);

  const form = useForm<ZPersonal>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      userId: "",
      nacionalidad: "",
      ubigeo: {
        departamento: "",
        provincia: "",
        distrito: "",
      },
      domicilio: "",
      interiorUrbanizacion: "",
      cargo: { nombre: "" },
      dependencia: { nombre: "", direccion: "", codigo: "" },
      sexo: undefined,
      dni: "",
      nAutogenerado: "",
      licenciaConducir: "",
      grupoSanguineo: undefined,
      fechaIngreso: undefined,
      fechaNacimiento: undefined,
      unidadEstructurada: "",
      telefono: "",
      celular: "",
      regimenPensionario: undefined,
      nombreAfp: "",
      situacionLaboral: undefined,
      estadoCivil: undefined,
      discapacidad: false,
    },
  });

  useEffect(() => {
    const fetchPersonalData = async () => {
      if (session?.user?.id) {
        form.setValue("userId", session.user.id);
        try {
          const personalData = await getCurrentPersonal(session.user.id);
          if (personalData) {
            form.reset(personalData);
            setIsCompleteFromDB(true);
          } else setIsCompleteFromDB(false);
        } catch (error) {
          console.error("Error obteniendo datos personales:", error);
          setIsCompleteFromDB(false);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPersonalData();
  }, [session, form]);

  const onSubmit = async (data: ZPersonal) => {
    try {
      await createPersonal(data);
      setIsCompleteFromDB(true);
      console.log("Datos enviados correctamente");
    } catch (error) {
      console.error("Error enviando los datos:", error);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-5">
        <FormField
          control={form.control}
          name="nacionalidad"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nacionalidad *</FormLabel>
              <FormControl>
                <Input placeholder="Nacionalidad" {...field} type="text" disabled={isCompleteFromDB} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Lugar de nacimiento</p>
          <div className="gap-2 grid grid-cols-3">
            <FormField
              control={form.control}
              name="ubigeo.departamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departamento *</FormLabel>
                  <FormControl>
                    <Input placeholder="AYACUCHO" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ubigeo.provincia"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Provincia *</FormLabel>
                  <FormControl>
                    <Input placeholder="HUAMANGA" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ubigeo.distrito"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Distrito *</FormLabel>
                  <FormControl>
                    <Input placeholder="AYACUCHO" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="gap-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="domicilio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Domicilio *</FormLabel>
                <FormControl>
                  <Input placeholder="Domicilio" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interiorUrbanizacion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interior - Urbanizacion</FormLabel>
                <FormControl>
                  <Input placeholder="Interior - urbanizacion" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="cargo.nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cargo *</FormLabel>
              <FormControl>
                <Input placeholder="ASISTENTE VIRTUAL" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col">
          <p className="font-inter font-semibold">Dependencia</p>
          <div className="gap-2 grid grid-cols-3">
            <FormField
              control={form.control}
              name="dependencia.nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre *</FormLabel>
                  <FormControl>
                    <Input placeholder="nombre de la dependencia" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dependencia.direccion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion</FormLabel>
                  <FormControl>
                    <Input placeholder="direccion de la dependencia" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dependencia.codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo</FormLabel>
                  <FormControl>
                    <Input placeholder="codigo de la dependencia" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="gap-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>DNI *</FormLabel>
                <FormControl>
                  <Input placeholder="12345678" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sexo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sexo *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione su sexo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Femenino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="gap-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="nAutogenerado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>N Autogenerado *</FormLabel>
                <FormControl>
                  <Input placeholder="numero autogenerado" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="licenciaConducir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Licencia de conducir</FormLabel>
                <FormControl>
                  <Input placeholder="licencia de conducir" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="grupoSanguineo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grupo saguineo *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una opcion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A_POSITIVO">A+</SelectItem>
                  <SelectItem value="A_NEGATIVO">A-</SelectItem>
                  <SelectItem value="B_POSITIVO">B+</SelectItem>
                  <SelectItem value="B_NEGATIVO">B-</SelectItem>
                  <SelectItem value="AB_POSITIVO">AB+</SelectItem>
                  <SelectItem value="AB_NEGATIVO">AB-</SelectItem>
                  <SelectItem value="O_POSITIVO">O+</SelectItem>
                  <SelectItem value="O_NEGATIVO">O-</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="gap-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="fechaNacimiento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de nacimiento *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(new Date(field.value), "PPP") : <span>Seleccione la fecha</span>}
                        <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? field.value : undefined}
                      onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fechaIngreso"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha de ingreso *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(new Date(field.value), "PPP") : <span>Seleccione la fecha</span>}
                        <CalendarIcon className="opacity-50 ml-auto w-4 h-4" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-auto" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? field.value : undefined}
                      onSelect={(date) => field.onChange(date ? date.toISOString() : "")}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="unidadEstructurada"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unidad estructurada *</FormLabel>
              <FormControl>
                <Input placeholder="Unidad estructurada" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="gap-2 grid grid-cols-2">
          <FormField
            control={form.control}
            name="celular"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular *</FormLabel>
                <FormControl>
                  <Input placeholder="Celular" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefono</FormLabel>
                <FormControl>
                  <Input placeholder="Telefono" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="regimenPensionario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Régimen pensionario *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su régimen pensionario" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="L. N° 29903">L. N° 29903</SelectItem>
                  <SelectItem value="D. L. N° 19990">D. L. N° 19990</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nombreAfp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre AFP *</FormLabel>
              <FormControl>
                <Input placeholder="nombre AFP" {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="situacionLaboral"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Situacion Laboral *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione su situación laboral" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Nombrado-D-L. 276">Nombrado-D-L. 276</SelectItem>
                  <SelectItem value="Contratado plaza vacante">Contratado plaza vacante</SelectItem>
                  <SelectItem value="Contratado ley 30057">Contratado ley 30057</SelectItem>
                  <SelectItem value="Contratado CAS-Indeterminado">Contratado CAS-Indeterminado</SelectItem>
                  <SelectItem value="Contratado en CAS-Temporal D.L. 1057">Contratado en CAS-Temporal D.L. 1057</SelectItem>
                  <SelectItem value="Contratado en proyecto de inversión">Contratado en proyecto de inversión</SelectItem>
                  <SelectItem value="Practicantes preprofesionales-D.L. 1404">Practicantes preprofesionales-D.L. 1404</SelectItem>
                  <SelectItem value="Practicante profesional-D.L. 1004">Practicante profesional-D.L. 1004</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estadoCivil"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado civil *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado civil" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="S">Soltero</SelectItem>
                  <SelectItem value="C">Casado</SelectItem>
                  <SelectItem value="V">Viudo</SelectItem>
                  <SelectItem value="D">Divorciado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discapacidad"
          render={({ field }) => (
            <FormItem className="flex flex-row justify-between items-center p-4 border hover:border-[#d20f39] rounded-lg">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Discapacidad *</FormLabel>
                <FormDescription>Presenta algun tipo de discapacidad.</FormDescription>
              </div>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} className="" />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          {!isCompleteFromDB && (
            <Button type="submit" onClick={() => console.log(form)} className="justify-end bg-[#d20f39] hover:bg-[#e64553]">
              Guardar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};
