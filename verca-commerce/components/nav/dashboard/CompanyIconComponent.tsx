import Link from "next/link";
import Image from "next/image";
import React from "react";
import { getSiteConfig } from "@/lib/data";
import prisma from "@/prisma/client";

async function CompanyIconComponent() {
  const siteConfig = await getSiteConfig();
  console.log("SiteConfig", siteConfig);
  return (
    <div>
      <Link
        className="items-center gap-2 mb-2 flex h-10 justify-between rounded-md bg-blue-600 p-4 md:h-20"
        href="/shop"
      >
        <div className="flex items-center justify-between w-32 text-white md:w-40">
          <Image
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Verca"
            width={100}
            height={100}
          />
        </div>
        <span className=" font-semibold">
          {siteConfig?.companyName || "asd"}
        </span>
      </Link>
    </div>
  );
}

export default CompanyIconComponent;
