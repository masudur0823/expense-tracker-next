import { FaMoneyBillAlt } from "react-icons/fa";

export default function Home() {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-5 justify-center my-5">
        <Card
          title="Income"
          bg="green"
          amount={200}
          icon={<FaMoneyBillAlt />}
        />
        <Card
          title="Expense"
          bg="red"
          amount={400}
          icon={<FaMoneyBillAlt />}
        />
      </div>
    </div>
  );
}

function Card({ title, amount, bg, icon }) {
  return (
    <div
      className={`p-4 bg-${bg}-600 text-white rounded-lg w-52 flex items-center justify-between`}
    >
      <div>
        <h5 className="text-xl">{title}</h5>
        <h3 className="text-3xl font-semibold font-mono">{amount}</h3>
      </div>
      <div className="text-6xl">{icon}</div>
    </div>
  );
}
