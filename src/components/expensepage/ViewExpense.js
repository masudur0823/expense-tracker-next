import dayjs from "dayjs";
var isoWeek = require("dayjs/plugin/isoWeek");
dayjs.extend(isoWeek);
import React, { useEffect, useState } from "react";
import Table from "../table/Table";

function ViewExpense({
  deleteExpense,
  data,
  filterByDay,
  filterByWeek,
  filterMonthYear,
  filterCategory,
  filterName,
  filterAmount,
  setDate,
  setCategory,
  setExpenseName,
  setAmount,
  setItemID,
  setIsUpdate,
  setTotalAmount,
  setTotalData,
}) {
  const [finalData, setFinalData] = useState([]);
  const applyFilters = () => {
    let updateList = data;

    if (filterCategory) {
      updateList = updateList?.filter(
        (item) => item?.category.toLowerCase() === filterCategory.toLowerCase()
      );
    }

    if (filterName) {
      updateList = updateList?.filter((item) =>
        item?.expenseName.toLowerCase().includes(filterName.toLowerCase())
      );
    }

    if (filterAmount) {
      updateList = updateList?.filter((item) =>
        item?.amount.toString().includes(filterAmount)
      );
    }

    if (filterMonthYear) {
      updateList = updateList?.filter(
        (item) => item?.date.slice(0, 7) === filterMonthYear
      );
    }

    if (filterByWeek) {
      updateList = updateList?.filter(
        (item) =>
          dayjs(item.date).format("YYYY-W") +
            dayjs(item.date).isoWeek().toString() ===
          filterByWeek
      );
    }

    if (filterByDay) {
      updateList = updateList?.filter(
        (item) => dayjs(item.date).format("YYYY-MM-DD") === filterByDay
      );
    }

    setFinalData(updateList);
    setTotalData(updateList?.length);
  };

  useEffect(() => {
    applyFilters();
  }, [
    filterCategory,
    filterName,
    filterAmount,
    filterMonthYear,
    filterByWeek,
    filterByDay,
    data,
  ]);

  useEffect(() => {
    const totalAmount = finalData?.reduce((a, c) => a + c.amount, 0);
    setTotalAmount(totalAmount);
  }, [finalData]);

  const columns = [
    {
      label: "Date",
      key: "date",
      render: (value) => dayjs(value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      label: "Expense Name",
      key: "expenseName",
    },
    {
      label: "Amount",
      key: "amount",
    },
    {
      label: "Action",
      key: "id",
      render: (value, row) => (
        <>
          <button
            onClick={() => {
              setExpenseName(row?.expenseName);
              setAmount(row?.amount);
              setDate(dayjs(row?.date).format("YYYY-MM-DDThh:mm"));
              setCategory(row?.category);
              setItemID(row?.id);
              setIsUpdate(true);
            }}
          >
            🔄
          </button>
          <button onClick={() => deleteExpense(value)}>❌</button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
}

export default ViewExpense;
