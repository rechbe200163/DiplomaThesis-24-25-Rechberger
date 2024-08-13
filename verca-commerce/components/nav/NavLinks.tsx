"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function NavLinks() {
  const pathname = usePathname();

  const links = [
    { label: "All", href: "/search" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav>
      <ul className="flex flex-row space-x-5">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={cn(
              "text-zinc-500 hover:underline transition-transform ",
              {
                "font-medium text-zinc-950 underline ": pathname === link.href,
              }
            )}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default NavLinks;
