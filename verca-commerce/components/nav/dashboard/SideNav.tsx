import Link from "next/link";
import NavLinksProfile from "./NavLinksProfile";
import Image from "next/image";
import ProfileIconComponent from "./ProfileIconComponent";
import CompanyIconComponent from "./CompanyIconComponent";
import { Suspense } from "react";

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyIconComponent />
      </Suspense>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinksProfile />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
      </div>
      <div className="card rounded-tl-badge rounded-br-badge rounded-sm ">
        <ProfileIconComponent />
      </div>
    </div>
  );
}
