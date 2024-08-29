import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getSiteConfig } from "@/lib/data";
import prisma from "@/prisma/client";

async function CompanyIconComponent() {
  const siteConfig = await getSiteConfig();
  console.log("SiteConfig", siteConfig);
  return (
    <nav>
      <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          width={34}
          height={34}
          alt="Horizon logo"
          className="size-[24px] max-xl:size-14"
        />
        <h1 className="sidebar-logo">{siteConfig?.companyName || "Horizon"}</h1>
      </Link>
    </nav>
  );
}

export default CompanyIconComponent;
