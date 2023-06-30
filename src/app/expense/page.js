"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase_config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import useGetdata from "@/hooks/useGetdata";
import Filter from "@/components/expensepage/Filter";
import useGetObject from "@/hooks/useGetObject";
import ExpenseLayout from "@/components/expensepage";
import ModifyExpense from "@/components/expensepage/ModifyExpense";
import ViewExpense from "@/components/expensepage/ViewExpense";

export default function Home() {
  const { getData, data } = useGetdata();
  const { categoryList } = useGetObject();
  const expenseCollectionRef = collection(db, "expense");

  // states
  const [isUpdate, setIsUpdate] = useState(false);
  const [itemID, setItemID] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalData, setTotalData] = useState(0);

  // filter Sates
  const [filterMonthYear, setFilterMonthYear] = useState("");
  const [filterByWeek, setFilterByWeek] = useState("");
  const [filterByDay, setFilterByDay] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterAmount, setFilterAmount] = useState("");

  // form states
  const [date, setDate] = useState(new Date().toISOString());
  const [category, setCategory] = useState("Food");
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState(0);

  // get expense
  useEffect(() => {
    getData(expenseCollectionRef);
  }, []);

  // delete expense
  const deleteExpense = async (id) => {
    const expenseDoc = doc(db, "expense", id);
    await deleteDoc(expenseDoc);
    getData(expenseCollectionRef);
  };

  return (
    <ExpenseLayout>
      {/* left side */}
      <div className="w-full md:w-80 flex flex-col gap-5">
        <ModifyExpense
          getData={getData}
          expenseCollectionRef={expenseCollectionRef}
          itemID={itemID}
          isUpdate={isUpdate}
          categoryList={categoryList}
          date={date}
          setDate={setDate}
          category={category}
          setCategory={setCategory}
          expenseName={expenseName}
          setExpenseName={setExpenseName}
          amount={amount}
          setAmount={setAmount}
          setIsUpdate={setIsUpdate}
        />
        <p>
          <b>Total Expense:</b> {totalAmount} tk
        </p>
        <p>
          <b>Total Items:</b> {totalData}
        </p>
        <Filter
          filter={filterCategory}
          setFilter={setFilterCategory}
          filterName={filterName}
          setFilterName={setFilterName}
          filterAmount={filterAmount}
          setFilterAmount={setFilterAmount}
          filterMonthYear={filterMonthYear}
          setFilterMonthYear={setFilterMonthYear}
          filterByWeek={filterByWeek}
          setFilterByWeek={setFilterByWeek}
          filterByDay={filterByDay}
          setFilterByDay={setFilterByDay}
        />
      </div>

      {/* right side */}
      <div className="w-full gap-5">
        <ViewExpense
          deleteExpense={deleteExpense}
          data={data}
          filterByWeek={filterByWeek}
          filterMonthYear={filterMonthYear}
          filterAmount={filterAmount}
          filterName={filterName}
          filterCategory={filterCategory}
          setDate={setDate}
          setCategory={setCategory}
          setExpenseName={setExpenseName}
          setAmount={setAmount}
          setItemID={setItemID}
          setIsUpdate={setIsUpdate}
          setTotalAmount={setTotalAmount}
          setTotalData={setTotalData}
          filterByDay={filterByDay}
        />
      </div>
    </ExpenseLayout>
  );
}
