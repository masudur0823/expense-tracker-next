import React from "react";

function InputArea({
  expenseName,
  setExpenseName,
  amount,
  setAmount,
  handleSubmit,
  detectUpdate,
}) {
  

  return (
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
      {detectUpdate?.status === true ? (
        <button
          onClick={handleSubmit}
          className="h-10 w-10 bg-orange-400 rounded-full shadow-md"
        >
          ✔
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className="h-10 w-10 bg-orange-400 rounded-full shadow-md"
        >
          ➕
        </button>
      )}
    </div>
  );
}

export default InputArea;
