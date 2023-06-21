"use client";
import { useEffect, useMemo, useState } from "react";
import { db } from "@/firebase/firebase_config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import useGetdata from "@/hooks/useGetdata";
import dayjs from "dayjs";
import Filter from "@/components/expensepage/Filter";

export default function Home() {
  const { getData, data } = useGetdata();
  const [isUpate, setIsUpdate] = useState(false);
  const [itemID, setItemID] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString());
  const [category, setCategory] = useState("Food");
  const [filterCategory, setFilterCategory] = useState("");
  const expenseCollectionRef = collection(db, "expense");
  // category
  const categoryList = [
    "Food",
    "Utility Bill",
    "Medicine",
    "Rent",
    "Loan",
    "Others",
  ];

  // get expense
  useEffect(() => {
    getData(expenseCollectionRef);
  }, []);

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
    const expenseDoc = doc(db, "expense", itemID);
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

  // delete expense
  const deleteExpense = async (id) => {
    const expenseDoc = doc(db, "expense", id);
    await deleteDoc(expenseDoc);
    getData(expenseCollectionRef);
  };

  const totalAmount = data
    ?.map((item) => item.amount)
    .reduce((a, c) => a + c, 0);
    console.log(filterCategory)

  const expenseListControl = useMemo(() => {
    return data?.map((item, index) => {
      if (item?.category?.toLowerCase().indexOf(filterCategory.toLowerCase()) === -1) {
        return;
      }
      return (
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
      );
    });
  }, [data, filterCategory]);

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:justify-center py-5">
      {/* left side */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-2 ">
          <div className="flex flex-col gap-2">
            {isUpate && (
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
          </div>
          <button
            onClick={isUpate ? updateExpense : createExpense}
            className="h-10 w-10 bg-orange-400 rounded-full shadow-md"
          >
            {isUpate ? "✔" : "➕"}
          </button>
        </div>
        <p>
          <b>Total Expense:</b> {totalAmount} tk
        </p>
        <Filter filter={filterCategory} setFilter={setFilterCategory} />
      </div>

      {/* right side */}
      <div className="flex gap-5">
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
                <>{expenseListControl}</>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
