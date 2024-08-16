"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { HomeIcon, LucideListOrdered } from "lucide-react";
import { PiInvoice } from "react-icons/pi";

const links = [
  { name: "Account", href: "/profile", icon: HomeIcon },
  { name: "Orders", href: "/profile/orders", icon: LucideListOrdered },
  { name: "Invoices", href: "/profile/invoices", icon: PiInvoice },
];

export default function NavLinksProfile() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center gap-2 rounded-md p-3 text-sm font-medium hover:opacity-100",
              {
                "bg-blue-600 text-white opacity-100 ": pathname === link.href,
                "bg-gray-100 hover:bg-blue-100 hover:text-blue-600":
                  pathname !== link.href,
              }
            )}
          >
            <LinkIcon className="w-6 h-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
