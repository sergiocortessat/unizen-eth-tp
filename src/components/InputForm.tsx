import React, { useState } from "react";
import search from "../../public/search.svg";
import Image from "next/image";

type InputFormProps = {
  handleSubmit: (address: string) => void;
  error: string;
};
const InputForm = ({ handleSubmit, error }: InputFormProps) => {
  const [address, setAddress] = useState("");
  return (
    <div className="my-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(address);
          setAddress("");
        }}
        className="w-full max-w-md mb-5 relative mx-auto"
      >
        <input
          type="search"
          className="w-full border rounded-md px-3 py-2 pr-10 text-white bg-transparent focus:outline-none"
          placeholder="Enter account address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald p-1 rounded-md focus:outline-none focus:bg-darkEmerald"
          aria-label="Search"
        >
          <Image src={search} alt="Search" />
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}{" "}
    </div>
  );
};

export default InputForm;
