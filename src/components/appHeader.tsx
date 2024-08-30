"use client";

import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Dashboard",
    path: "/app/dashboard",
  },
  {
    name: "Account",
    path: "/app/account",
  },
];

function AppHeader() {
  const activeName = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex gap-2 text-2xl ">
          {routes.map((route) => (
            <li key={route.name}>
              <Link
                className={cn(
                  "text-white/70 hover:text-white focus:text-white transition  rounded-sm px-2 py-1",
                  {
                    "bg-black/10 text-white": activeName === route.path,
                  }
                )}
                href={route.path}
              >
                {route.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default AppHeader;
