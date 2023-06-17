import React from "react";

function ExpenseList({
  expenseList,
  setExpenseList,
  handleClickUpdate,
  detectUpdate,
}) {
  const handleClickDelete = (index) => {
    const newLists = [...expenseList];
    newLists.splice(index, 1);
    setExpenseList(newLists);
  };

  const totalAmount = expenseList
    ?.map((item) => item.amount)
    .reduce((a, c) => a + c, 0);
    
  return (
    <div className="my-4">
      <table>
        <thead>
          <tr className="bg-gray-400 ">
            <th className="border p-1">Expense Name:</th>
            <th className="border p-1">Expense Amount:</th>
            <th className="border p-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {expenseList?.length === 0 ? (
            <tr>
              <td colSpan={3} className="border p-1">
                No data found
              </td>
            </tr>
          ) : (
            <>
              {expenseList?.map((item, index) => (
                <tr key={index}>
                  <td className="border p-1">{item?.expenseName}</td>
                  <td className="border p-1">{item?.amount}</td>
                  <td className="border p-1">
                    <button onClick={() => handleClickUpdate(item, index)}>
                      🔄
                    </button>
                    <button
                      onClick={() => handleClickDelete(index)}
                      disabled={detectUpdate.index === index && true}
                      className={detectUpdate.index === index && "opacity-50"}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </>
          )}
          <tr>
            <th className="border">Total</th>
            <th className="border">{totalAmount}</th>
            <th className="border"></th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;
