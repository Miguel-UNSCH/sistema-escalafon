"use client";

export type IForm = {
  name: string;
};

const Form = () => {
  return <div>form</div>;
};

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins text-[#11111b]">
      <div className="flex flex-col justify-center items-center gap-4 bg-white p-8 rounded-lg">
        <h3 className="font-bold font-montserrat text-2xl text-center uppercase">contratos y nombramiento</h3>
        <div className="flex-row justify-evenly items-center gap-2 hidden">
          <span className="flex justify-center items-center bg-[#ccd0da] rounded-full w-8 h-8">1</span>
          <div className="flex-grow bg-[#ccd0da] h-1"></div>
          <span className="flex justify-center items-center bg-[#ccd0da] rounded-full w-8 h-8">2</span>
        </div>

        <div className="flex justify-center items-center">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Page;
