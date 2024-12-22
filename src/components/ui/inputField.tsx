import React, { FC } from "react";

interface InputFieldProps {
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({ type, label, value, onChange }) => {
  return (
    <div className="placeholder-container">
      <input type={type} value={value} onChange={onChange} placeholder=" " />
      <label>{label}</label>
    </div>
  );
};

export default InputField;
