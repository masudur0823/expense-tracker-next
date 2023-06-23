import React from "react";

function Select({children, filter, setFilter}) {
  return (
    <select
      className="border rounded-md py-2 px-4 w-full"
      name=""
      id=""
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      {children}
    </select>
  );
}

export default Select;
