import React from "react";
import useGetObject from "@/hooks/useGetObject";

function Filter({ filter, setFilter }) {
  const { categoryList } = useGetObject();

  return (
    <div>
      <p>
        <b>Filter: </b>
      </p>
      <select
        className="border rounded-md py-2 px-4 w-full"
        name=""
        id=""
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value={""}>All</option>
        {categoryList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
