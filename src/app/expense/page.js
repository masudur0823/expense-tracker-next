"use client";
import { useEffect, useState } from "react";
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

export default function Home() {
  const { getData, data } = useGetdata();
  const [isUpate, setIsUpdate] = useState(false);
  const [itemID, setItemID] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const expenseCollectionRef = collection(db, "expense");

  // get expense
  useEffect(() => {
    getData(expenseCollectionRef);
  }, [expenseCollectionRef]);

  // add expense
  const createExpense = async () => {
    await addDoc(expenseCollectionRef, {
      expenseName: expenseName,
      amount: parseInt(amount),
    });
    getData(expenseCollectionRef);
    setExpenseName("");
    setAmount("");
  };

  // update expense
  const updateExpense = async () => {
    setIsUpdate(false);
    const expenseDoc = doc(db, "expense", itemID);
    const newFields = { expenseName: expenseName, amount: parseInt(amount) };
    await updateDoc(expenseDoc, newFields);
    getData(expenseCollectionRef);
    setExpenseName("");
    setAmount("");
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

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:justify-center ">
      <div className="flex flex-row gap-2 ">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Enter tasks"
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
      <div className="flex gap-5">
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
              {data?.length === 0 ? (
                <tr>
                  <td colSpan={3} className="border p-1">
                    No data found
                  </td>
                </tr>
              ) : (
                <>
                  {data?.map((item, index) => (
                    <tr key={index}>
                      <td className="border p-1">{item?.expenseName}</td>
                      <td className="border p-1">{item?.amount}</td>
                      <td className="border p-1">
                        <button
                          onClick={() => {
                            setExpenseName(item.expenseName);
                            setAmount(item.amount);
                            setItemID(item.id);
                            setIsUpdate(true);
                          }}
                        >
                          🔄
                        </button>
                        <button onClick={() => deleteExpense(item?.id)}>
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
      </div>
    </div>
  );
}
