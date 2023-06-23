import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

function ViewExpense({
  deleteExpense,
  data,
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

  useEffect(() => {
    const newItem = data?.filter((item) => {
      console.log(new Date(item.date).getFullYear().toString())
      if (
        filterCategory === "" &&
        filterName === "" &&
        filterAmount === "" &&
        filterMonthYear === null
      ) {
        return item;
      } else {
        if (filterCategory) {
          return (
            item?.category.toLowerCase() === filterCategory.toLowerCase() &&
            item?.expenseName
              .toLowerCase()
              .includes(filterName.toLowerCase()) &&
            item?.amount.toString().includes(filterAmount) &&
            item?.date.slice(0,7) === filterMonthYear
          );
        }
        if (filterName) {
          return item?.expenseName
            .toLowerCase()
            .includes(filterName.toLowerCase());
        }
        if (filterAmount) {
          return item?.amount.toString().includes(filterAmount);
        }
        if (filterMonthYear) {
          return  item?.date.slice(0,7) === filterMonthYear
        }
      }
    });
    setFinalData(newItem);
    setTotalData(newItem?.length);
  }, [data, filterCategory, filterName, filterAmount, filterMonthYear]);

  useEffect(() => {
    const totalAmount = finalData?.reduce((a, c) => a + c.amount, 0);
    setTotalAmount(totalAmount);
  }, [finalData]);

  return (
    <div className="my-4 w-full overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-400 ">
            <th className="border p-1">Date</th>
            <th className="border p-1">Category</th>
            <th className="border p-1">Expense Name</th>
            <th className="border p-1">Expense Amount</th>
            <th className="border p-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td colSpan={5} className="border p-1 text-center">
                No data found
              </td>
            </tr>
          ) : (
            <>
              {finalData?.map((item, index) => (
                <tr key={index}>
                  <td className="border p-1">
                    {dayjs(item?.date).format("DD/MM/YYYY hh:mm A")}
                  </td>
                  <td className="border p-1">{item?.category}</td>
                  <td className="border p-1">{item?.expenseName}</td>
                  <td className="border p-1">{item?.amount}</td>
                  <td className="border p-1">
                    <button
                      onClick={() => {
                        setExpenseName(item?.expenseName);
                        setAmount(item?.amount);
                        setDate(dayjs(item?.date).format("YYYY-MM-DDThh:mm"));
                        setCategory(item?.category);
                        setItemID(item?.id);
                        setIsUpdate(true);
                      }}
                    >
                      🔄
                    </button>
                    <button onClick={() => deleteExpense(item?.id)}>❌</button>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
      {/* pagination */}
    </div>
  );
}

export default ViewExpense;
