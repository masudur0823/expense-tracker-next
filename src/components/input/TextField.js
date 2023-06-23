import React from "react";

function TextField({ value, onChange, type }) {
  return (
    <input
      type={type ? type : 'text'}
      min={type === 'number' && 0}
      className="border rounded-md py-2 px-4 w-full"
      value={value}
      onChange={onChange}
    />
  );
}

export default TextField;
