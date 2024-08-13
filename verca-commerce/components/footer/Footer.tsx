import prisma from "@/prisma/client";
import { SiteConfig } from "@prisma/client";
import React from "react";

async function Footer() {
  const siteConfig = await prisma.siteConfig.findFirstOrThrow({
    include: { address: true },
  });

  return (
    <footer className="bg-gray-800 text-white p-5">
      <div className="flex justify-around">
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">{siteConfig.companyName}</h2>
          <p>{siteConfig.address.streetName}</p>
          <p>{siteConfig.address.city}</p>
          <p>{siteConfig.address.state}</p>
          <p>{siteConfig.address.postcode}</p>
        </div>
        <div className="flex flex-col items-start">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p>{siteConfig.phoneNumber}</p>
          <p>{siteConfig.email}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
