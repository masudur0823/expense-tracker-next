"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase/firebase_config";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [data, setData] = useState([]);
  const expenseCollectionRef = collection(db, "expense");
  useEffect(() => {
    const getData = async () => {
      const res = await getDocs(expenseCollectionRef);
      setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  // const totalAmount = data
  // ?.map((item) => item.amount)
  // .reduce((a, c) => a + c, 0);

  console.log(data)
  

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:justify-center ">
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
                        <button>🔄</button>
                        <button>❌</button>
                      </td>
                    </tr>
                  ))}
                </>
              )}
              <tr>
                <th className="border">Total</th>
                <th className="border">555555</th>
                <th className="border"></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
