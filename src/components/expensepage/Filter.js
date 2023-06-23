import React from "react";
import useGetObject from "@/hooks/useGetObject";
import Select from "../input/Select";
import TextField from "../input/TextField";

function Filter({
  filter,
  setFilter,
  filterName,
  setFilterName,
  filterAmount,
  setFilterAmount,
  filterMonthYear,
  setFilterMonthYear,
  filterByWeek,
  setFilterByWeek,
  filterByDay,
  setFilterByDay
}) {
  const { categoryList } = useGetObject();

  return (
    <div>
      <p className="text-xl bg-slate-500 text-white py-2 ps-4 ">
        <b>Filter By </b>
      </p>
      <p className="my-2">
        <b>Day </b>
      </p>
      <TextField
        type="date"
        value={filterByDay}
        onChange={(e) => setFilterByDay(e.target.value)}
      />
      <p className="my-2">
        <b>Week </b>
      </p>
      <TextField
        type="week"
        value={filterByWeek}
        onChange={(e) => setFilterByWeek(e.target.value)}
      />
      <p className="my-2">
        <b>Month Year </b>
      </p>
      <TextField
        type="month"
        value={filterMonthYear}
        onChange={(e) => setFilterMonthYear(e.target.value)}
      />

      <p className="my-2">
        <b>Category </b>
      </p>
      <Select filter={filter} setFilter={setFilter}>
        <option value={""}>All</option>
        {categoryList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </Select>

      <p className="my-2">
        <b>Expense Name </b>
      </p>
      <TextField
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
      />

      <p className="my-2">
        <b>Expense Amount</b>
      </p>
      <TextField
        type="number"
        value={filterAmount}
        onChange={(e) => setFilterAmount(e.target.value)}
      />
    </div>
  );
}

export default Filter;
