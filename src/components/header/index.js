"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const navList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Income",
      path: "/income",
    },
    {
      name: "Expense",
      path: "/expense",
    },
  ];

  return (
    <div className={style.main}>
        {navList.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={index}
              href={item.path}
              className={isActive ? style.active : style.inactive}
            >
              {item.name}
            </Link>
          );
        })}
    </div>
  );
}

const style = {
  main:"flex justify-center gap-2 p-3 bg-slate-600",
  inactive: "text-slate-400 py-2 px-5 border border-slate-400 rounded-lg",
  active: "text-white py-2 px-5 border border-white rounded-lg",
};
