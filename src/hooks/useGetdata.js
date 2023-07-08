import { useState } from "react";
import { getDocs, orderBy, query, where, limit } from "firebase/firestore";

const useGetdata = () => {
  const [data, setData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  const getData = async (expenseCollectionRef) => {
    const q = query(expenseCollectionRef, orderBy("date", "desc"));
    // const q = query(expenseCollectionRef, where("category", "==", filterCategory));
    const res = await getDocs(q);
    const finalRes = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setData(finalRes);
    // setData()
    // res.forEach((doc) => {
    //   console.log(doc.data())
    //   // doc.data() is never undefined for query doc snapshots
    //   // console.log(doc.id, " => ", doc.data());
    // });
  };

  const getIncomeData = async (incomeCollectionRef) => {
    const q = query(incomeCollectionRef, orderBy("date", "desc"));
    const res = await getDocs(q);
    const finalRes = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setIncomeData(finalRes);
  }

  return { getData, data ,getIncomeData, incomeData};
};

export default useGetdata;
