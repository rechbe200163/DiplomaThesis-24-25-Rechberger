import React, { Suspense } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import HomeIcon from "./HomeIcon";
import { VscLoading } from "react-icons/vsc";
import { AiOutlineLoading } from "react-icons/ai";
import { Skeleton } from "../ui/skeleton";
import SearchComponent from "../search/SearchComponent";

async function NavBar() {
  return (
    <div className="flex flex-row items-center justify-between p-3 border-b-2 border-gray-500">
      <nav className="flex items-center space-x-5">
        <Link
          href="/shop"
          className="flex flex-row items-center space-x-2 p-2 rounded-full"
        >
          <IoHomeOutline size={25} />
          <Suspense fallback={<Skeleton className="w-20 h-4" />}>
            <HomeIcon />
          </Suspense>
        </Link>
        <NavLinks />
      </nav>
      <div className="flex items-center space-x-6 pr-5 w-fit">
        <SearchComponent placeholder="Search for products..." />
        <Link href="sign-in">
          <MdOutlineAccountCircle size={30} />
        </Link>
        <Link href="cart">
          <IoCartOutline size={30} />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
