import { useState } from "react";
import {  getDocs, } from "firebase/firestore";

const useGetdata = () => {
    const [data, setData] = useState([]);

    const getData = async (expenseCollectionRef) => {
      const res = await getDocs(expenseCollectionRef);
      setData(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    

    return {getData, data}
}

export default useGetdata;