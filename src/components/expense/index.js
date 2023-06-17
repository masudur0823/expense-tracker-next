"use client";
import React, { useEffect, useState } from "react";
import SectionHeader from "../sectionHeader";
import InputArea from "./InputArea";
import Filter from "./Filter";
import ExpenseList from "./ExpenseList";

export default function Expense() {
  const [expenseList, setExpenseList] = useState([]);
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState(null);
  const [detectUpdate, setDetectUpdate] = useState({ status: false });
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    setExpenseList([
      { expenseName: "expense1", amount: 200 },
      { expenseName: "expense2", amount: 400 },
      { expenseName: "expense3", amount: 600 },
    ]);
  }, []);

  const handleSubmit = () => {
    if (detectUpdate?.status === false) {
      // add expense
      setExpenseList((prev) => [
        ...prev,
        {
          expenseName: expenseName,
          amount: parseInt(amount),
        },
      ]);
    } else {
      // update expense
      const newLists = [...expenseList];
      const items = newLists[detectUpdate.index];
      const newObject = { expenseName: expenseName, amount: parseInt(amount) };
      newLists.splice(detectUpdate.index, 1, newObject);
      setExpenseList(newLists);
      setDetectUpdate({ index: false });
    }

    setExpenseName("");
    setAmount("");
  };

  const handleClickUpdate = (item, index) => {
    setDetectUpdate({ status: true, index: index });
    setExpenseName(item?.expenseName);
    setAmount(item?.amount);
  };


  return (
    <div className="text-center flex gap-3 flex-col items-center">
      <SectionHeader title="Expense" />
      <InputArea
        expenseName={expenseName}
        setExpenseName={setExpenseName}
        amount={amount}
        setAmount={setAmount}
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        detectUpdate={detectUpdate}
        handleSubmit={handleSubmit}
      />
      {/* <Filter filterValue={filterValue} setFilterValue={setFilterValue} expenseList={expenseList} setExpenseList={setExpenseList} /> */}

      <ExpenseList
      filterValue={filterValue} 
        expenseList={expenseList}
        setExpenseList={setExpenseList}
        handleClickUpdate={handleClickUpdate}
        detectUpdate={detectUpdate}
      />
    </div>
  );
}
