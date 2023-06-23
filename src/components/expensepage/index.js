

export default function ExpenseLayout({children}) {

  return (
    <div className="flex flex-col md:flex-row gap-5 w-full py-5 px-3 sm:px-5 md:px-10">
      {children}
    </div>
  );
}
