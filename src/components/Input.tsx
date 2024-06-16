import React from "react";

const Input = ({ label, placeholder, value, onChange, className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={"ml-2"}>{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="min-w-[300px] rounded-full px-4 py-2 mt-1 focus:outline-blue-500"
      />
    </div>
  );
};

export default Input;
