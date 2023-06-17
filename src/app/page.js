import Expense from "@/components/expense";
import Todo from "@/components/todo";

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:justify-center ">
      <div className="flex gap-5">
        <Todo />
        <Expense />
      </div>
    </div>
  );
}
