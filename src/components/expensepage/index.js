

export default function ExpenseLayout({children}) {

  return (
    <div className="flex flex-col md:flex-row gap-5 items-start md:justify-center py-5">
      {children}
    </div>
  );
}
