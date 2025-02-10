const Page = () => {
  return (
    <div className="flex justify-center h-full font-poppins">
      <CreateUserForm />
    </div>
  );
};

const CreateUserForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3>crear usuaio</h3>
        <div className="flex flex-row gap-2">
          <div>
            <p>dni</p>
          </div>
          <div>
            <p>correo electronico</p>
          </div>
        </div>
      </div>
      <div>recuperar usuario</div>
    </div>
  );
};

export default Page;
