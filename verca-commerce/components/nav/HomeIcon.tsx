import prisma from "@/prisma/client";
import { SiteConfig } from "@prisma/client";
import React from "react";

async function HomeIcon() {
  const configName: SiteConfig = await prisma.siteConfig.findFirstOrThrow({});

  // wait for 3 seconds

  return <span>{configName.companyName}</span>;
}

export default HomeIcon;
