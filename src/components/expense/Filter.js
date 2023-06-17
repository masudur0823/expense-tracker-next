import React, { useEffect, useState } from "react";

function Filter({ filterValue, setFilterValue }) {
  return (
    <input
      type="text"
      placeholder="Enter name or price"
      className="border rounded-md py-2 px-4"
      value={filterValue}
      onChange={(e) => setFilterValue(e.target.value)}
    />
  );
}

export default Filter;
