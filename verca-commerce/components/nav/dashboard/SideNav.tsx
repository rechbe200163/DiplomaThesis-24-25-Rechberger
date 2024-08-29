import Link from "next/link";
import NavLinksProfile from "./NavLinksProfile";
import Image from "next/image";
import ProfileIconComponent from "./ProfileIconComponent";
import CompanyIconComponent from "./CompanyIconComponent";
import { Suspense } from "react";
import Search from "@/components/search/SearchComponent";

export default function SideNav() {
  return (
    <section className="flex h-full flex-col px-3 py-4 md:px-2">
      <Suspense fallback={<div>Loading...</div>}>
        <CompanyIconComponent />
      </Suspense>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex-1 max-w-screen-xl">
          <Suspense fallback={<div>Loading Search...</div>}>
            <Search placeholder="Search anything" />
          </Suspense>
        </div>

        <NavLinksProfile />
      </div>
    </section>
  );
}
