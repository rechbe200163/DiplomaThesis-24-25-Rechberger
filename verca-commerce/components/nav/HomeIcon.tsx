import prisma from "@/prisma/client";
import { SiteConfig } from "@prisma/client";
import React from "react";
import { BiHome } from "react-icons/bi";
import { IoHomeOutline } from "react-icons/io5";

async function HomeIcon() {
  const configName: SiteConfig = await prisma.siteConfig.findFirstOrThrow({});

  // wait for 3 seconds

  return (
    <p className="flex-row flex gap-2">
      <IoHomeOutline size={25} />
      {configName.companyName}
    </p>
  );
}

export default HomeIcon;
