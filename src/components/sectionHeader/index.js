import React from "react";

const SectionHeader = ({title}) => {
  return (
    <h1 className="capitalize text-3xl font-bold inline-block bg-black text-white px-20 py-3 my-3 rounded-lg">
      {title}
    </h1>
  );
}

export default SectionHeader;
