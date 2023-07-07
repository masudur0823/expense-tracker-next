"use client";
import { db } from "@/firebase/firebase_config";
import useGetdata from "@/hooks/useGetdata";
import { collection } from "firebase/firestore";
import { useEffect } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";

export default function Home() {
  const { getData, data } = useGetdata();
  const expenseCollectionRef = collection(db, "expense");
  // get expense
  useEffect(() => {
    getData(expenseCollectionRef);
  }, []);

  const totalAmount = data?.reduce((a, c) => a + c.amount, 0);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-5 justify-center my-5">
        <Card
          title="Remaining Balance"
          bg="bg-green-600"
          amount={200}
          icon={<FaMoneyBillAlt />}
        />
        <Card
          title="Total Expense"
          bg="bg-red-600"
          amount={totalAmount}
          icon={<FaMoneyBillAlt />}
        />
      </div>
    </div>
  );
}

function Card({ title, amount, bg, icon }) {
  return (
    <div
      className={`p-4 ${bg} text-white rounded-lg w-64 flex items-center justify-between`}
    >
      <div>
        <h5 className="text-sm">{title}</h5>
        <h3 className="text-3xl font-semibold font-mono">{amount}</h3>
      </div>
      <div className="text-6xl">{icon}</div>
    </div>
  );
}
