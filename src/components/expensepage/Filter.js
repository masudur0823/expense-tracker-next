import React from "react";

function Filter({ filter, setFilter }) {
  // category
  const categoryList = [
    {
      title: "All",
      value: "",
    },
    {
      title: "Food",
      value: "Food",
    },
    {
      title: "Utility Bill",
      value: "Utility Bill",
    },
    {
      title: "Medicine",
      value: "Medicine",
    },
    {
      title: "Rent",
      value: "Rent",
    },
    {
      title: "Loan",
      value: "Loan",
    },
    {
      title: "Others",
      value: "Others",
    },
  ];

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
        {categoryList.map((item, index) => (
          <option key={index} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
