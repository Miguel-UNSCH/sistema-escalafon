"use client";
import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LuPenLine, LuUserRound, LuX } from "react-icons/lu";

type InputComponentProps<T> = {
  label: string;
  dataType: "string" | "number" | T;
  icon: React.ReactNode;
  validationMessage: string;
};

export const InputComponent = <T,>({
  label,
  dataType,
  icon,
  validationMessage,
}: InputComponentProps<T>) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleCancel = () => {
    setValue("");
  };

  return (
    <div className="flex flex-col space-y-2">
      <label className="font-medium text-sm">{label}</label>
      <div className="relative flex items-center space-x-2 border-gray-300 p-2 border rounded-lg">
        <div className="flex-shrink-0">{icon}</div>
        <input
          type={dataType === "number" ? "number" : "text"}
          value={value}
          onChange={handleChange}
          // disabled={!isEditing}
          className="flex-grow bg-transparent p-2 border-none outline-none"
        />
        <div className="right-2 absolute flex space-x-2">
          <LuPenLine className="text-blue-500 cursor-pointer" />
          <LuX className="text-red-500 cursor-pointer" onClick={handleCancel} />
        </div>
      </div>
      <span className="text-red-500 text-xs">{validationMessage}</span>
    </div>
  );
};

const FormComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    phone: "",
    website: "",
    visitors: 0,
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="mx-auto p-5 max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="gap-6 grid lg:grid-cols-2 mb-6">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
              placeholder="John"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
              placeholder="Doe"
              required
            />
          </div>
          <div>
            <label
              htmlFor="company"
              className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
            >
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
              placeholder="company??"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
              placeholder="123-45-678"
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              required
            />
          </div>
          <div>
            <label
              htmlFor="website"
              className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
            >
              Website URL
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
              placeholder="flowbite.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="visitors"
              className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
            >
              Unique visitors (per month)
            </label>
            <input
              type="number"
              id="visitors"
              name="visitors"
              value={formData.visitors}
              onChange={handleChange}
              className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
            placeholder="john.doe@company.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block mb-2 font-medium text-gray-900 text-sm dark:text-gray-300"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="block border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 text-sm dark:placeholder-gray-400 dark:text-white"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              checked={formData.remember}
              onChange={handleChange}
              className="border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 border rounded focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 w-4 h-4"
              required
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 font-medium text-gray-900 text-sm dark:text-gray-400"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              terms and conditions
            </a>
            .
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-800 dark:hover:bg-blue-700 dark:bg-blue-600 px-5 py-2.5 rounded-lg focus:ring-4 dark:focus:ring-blue-800 w-full sm:w-auto font-medium text-white focus:outline-none focus:ring-blue-300 text-center text-sm"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center font-poppins">
      <div className="flex flex-col">
        <h3 className="font-bold font-montserrat text-xl uppercase">
          información personal
        </h3>
        <FormComponent />
      </div>
    </div>
  );
};

export default page;
