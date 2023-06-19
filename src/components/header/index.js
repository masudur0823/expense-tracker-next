"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname  = usePathname();
  const navList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Expense",
      path: "/expense",
    },
  ];

  const style = {
    inactive: "text-slate-400 py-2 px-5 border border-slate-400 rounded-lg",
    active: "text-white py-2 px-5 border border-white rounded-lg",
  };
  return (
    <div className="flex justify-center p-3 bg-slate-600">
      <div className="flex gap-2">
        {navList.map((item, index) => (
          <Link
            key={index}
            href={item.path}
            className={pathname === item.path ? style.active : style.inactive}
          >
            {item.name}
          </Link>
        ))}

        {/* <Link
          href="/expense"
          className={segment === "expense" ? style.active : style.inactive}
        >
          Examples
        </Link> */}
      </div>
    </div>
  );
}
