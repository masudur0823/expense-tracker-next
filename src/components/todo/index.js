"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../sectionHeader";

export default function Todo() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    setTodoList([
      { task: "task1", complete: false },
      { task: "task2", complete: false },
      { task: "task3", complete: false },
      { task: "task4", complete: false },
    ]);
  }, []);

  // add
  const handleClick = () => {
    if (task !== "") {
      setTodoList((prev) => [
        ...prev,
        {
          task: task,
          complete: false,
        },
      ]);
      setTask("");
    } else {
      alert("Enter a task first");
    }
  };
  // complete
  const handleClickComplete = (index) => {
    const newTodoItems = [...todoList];

    newTodoItems[index].complete === false
      ? (newTodoItems[index].complete = true)
      : (newTodoItems[index].complete = false);
    setTodoList(newTodoItems);
  };
  // update
  const handleClickUpdate = (index) => {
    const newList = [...todoList];
    const item = newList[index];
    const newTask = prompt(`Update ${item.task}?`, item.task);
    const newObject = { task: newTask, complete: false };
    newList.splice(index, 1, newObject);
    if (newTask === null || newTask === "") {
      return;
    } else {
      item.task = newTask;
    }
    setTodoList(newList);
  };
  // delete
  const handleClickDelete = (index) => {
    const newTodoItems = [...todoList];
    newTodoItems.splice(index, 1);
    setTodoList(newTodoItems);
  };

  return (
    <div className="text-center flex flex-col items-center">
      <SectionHeader title="Todo app" />
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter tasks"
          className="border rounded-md py-2 px-4"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={handleClick}
          className="h-10 w-10 bg-orange-400 rounded-full shadow-md"
        >
          +
        </button>
      </div>
      <ul className="list-disc inline-block">
        {todoList.map((item, index) => (
          <li
            key={index}
            className="flex flex-row gap-2 items-center justify-center"
          >
            <span
              className={`${
                item.complete === true ? "line-through" : "no-underline"
              }`}
            >
              {item.task}
            </span>{" "}
            <button onClick={() => handleClickComplete(index)}>✅</button>
            <button onClick={() => handleClickUpdate(index)}>🔄</button>
            <button onClick={() => handleClickDelete(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
