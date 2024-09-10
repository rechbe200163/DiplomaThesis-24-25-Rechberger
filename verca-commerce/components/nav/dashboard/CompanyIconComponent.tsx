import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getSiteConfig } from "@/lib/data";

async function CompanyIconComponent() {
  const siteConfig = await getSiteConfig();
  return (
    <nav>
      <Link
        href="/shop"
        className="mb-12 cursor-pointer flex items-center gap-2"
      >
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          width={100}
          height={100}
          alt="logo"
        />
        <h1 className="sidebar-logo">{siteConfig?.companyName || "Horizon"}</h1>
      </Link>
    </nav>
  );
}

export default CompanyIconComponent;
