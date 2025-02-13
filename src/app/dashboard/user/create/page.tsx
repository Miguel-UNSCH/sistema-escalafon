import FormRegister from "@/components/form-register";

const Page = () => {
  return (
    <div className="flex flex-col items-center gap-4 h-full font-poppins">
      <CreateUserForm />
      <div className="flex flex-col bg-[#dce0e8] p-4">
        <p className="font-inter font-semibold text-base uppercase">registrar varios usuarios</p>
        <div className="flex flex-row">
          <p>seleccione el documento</p>
        </div>
        <span className="font-montserrat text-xs">
          solo se admiten archivos en formato excel, json, csv, txt [los formatos estan en la documentacion]
        </span>
      </div>
    </div>
  );
};

const CreateUserForm = () => {
  return <FormRegister />;
};

export default Page;
