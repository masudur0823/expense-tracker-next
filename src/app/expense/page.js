"use client";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/firebase/firebase_config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import useGetdata from "@/hooks/useGetdata";
import dayjs from "dayjs";
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
  const [filterCategory, setFilterCategory] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
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
      <div className="flex flex-col gap-5">
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
        <Filter filter={filterCategory} setFilter={setFilterCategory} />
      </div>

      {/* right side */}
      <div className="flex gap-5">
        <ViewExpense
          deleteExpense={deleteExpense}
          data={data}
          filterCategory={filterCategory}
          setDate={setDate}
          setCategory={setCategory}
          setExpenseName={setExpenseName}
          setAmount={setAmount}
          setItemID={setItemID}
          setIsUpdate={setIsUpdate}
          setTotalAmount={setTotalAmount}
        />
      </div>
    </ExpenseLayout>
  );
}
