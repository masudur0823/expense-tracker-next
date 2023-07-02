import { addDoc, doc, updateDoc } from "firebase/firestore";
import React from "react";

function ModifyExpense({
  getData,
  expenseCollectionRef,
  itemID,
  isUpdate,
  setIsUpdate,
  categoryList,
  date,
  setDate,
  category,
  setCategory,
  expenseName,
  setExpenseName,
  amount,
  setAmount,
}) {
  // add expense
  const createExpense = async () => {
    setDate(new Date().toISOString());
    setCategory("Food");
    setExpenseName("");
    setAmount(0);
    await addDoc(expenseCollectionRef, {
      date: date,
      expenseName: expenseName,
      amount: parseInt(amount),
      category: category,
    });
    getData(expenseCollectionRef);
  };

  // update expense
  const updateExpense = async () => {
    const expenseDoc = doc(expenseCollectionRef, itemID);
    const newFields = {
      date: date,
      expenseName: expenseName,
      amount: parseInt(amount),
      category: category,
    };
    await updateDoc(expenseDoc, newFields);
    getData(expenseCollectionRef);
    setDate(new Date().toISOString());
    setCategory("");
    setExpenseName("");
    setAmount(0);
    setIsUpdate(false);
  };

  return (
    <div className="flex flex-col gap-2 ">
      
        {isUpdate && (
          <input
            type="datetime-local"
            className="border rounded-md py-2 px-4"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}

        <select
          className="border rounded-md py-2 px-4"
          name=""
          id=""
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categoryList.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter Expense"
          className="border rounded-md py-2 px-4"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />
        <input
          type="number"
          min="0"
          max="99999999"
          placeholder="Enter Amount"
          className="border rounded-md py-2 px-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      
      <button
        onClick={isUpdate ? updateExpense : createExpense}
        className="h-10 w-10 bg-orange-400 rounded-lg shadow-md font-semibold w-full text-white"
      >
        {isUpdate ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default ModifyExpense;
