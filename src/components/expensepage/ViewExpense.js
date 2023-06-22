import dayjs from "dayjs";
import React, { useEffect, useMemo, useState } from "react";

function ViewExpense({
  deleteExpense,
  data,
  filterCategory,
  setDate,
  setCategory,
  setExpenseName,
  setAmount,
  setItemID,
  setIsUpdate,
  setTotalAmount,
}) {
  const [finalData, setFinalData] = useState([]);
  useEffect(() => {
    let p = [];
    data?.map((item) => {
      if (item?.category === filterCategory) {
        p.push(item);
      }
      if (filterCategory === "") {
        p.push(item);
      }

    });
    setFinalData(p);

  }, [data, filterCategory]);

  useEffect(() => {
    const totalAmount = finalData?.reduce((a, c) => a + c.amount, 0);
    setTotalAmount(totalAmount);
  }, [finalData]);

  return (
    <div className="my-4">
     
      <table>
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
