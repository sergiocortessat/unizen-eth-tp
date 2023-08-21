import React, { useState } from "react";

type InputFormProps = {
  handleSubmit: (address: string) => void;
  error: string;
};
// react hook form.
const InputForm = ({ handleSubmit, error }: InputFormProps) => {
  const [address, setAddress] = useState("")
  return (
    <div className="my-10">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(address)
        }}
        className="w-full max-w-md mb-5 relative mx-auto"
      >
        <input
          type="search"
          className="w-full border rounded-md px-3 py-2 pr-10 text-white bg-transparent focus:outline-none"
          placeholder="Enter account address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value)
          }}
        />
        <button 
          type="submit" 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-emerald p-2 rounded-md focus:outline-none focus:bg-darkEmerald"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-white"
          >
            <path
              fillRule="evenodd"
              d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>} {/* Display error below the form */}
    </div>
  );
};

export default InputForm;
