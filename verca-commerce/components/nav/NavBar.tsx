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
import { getServerSession } from "next-auth";
import { signIn, auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

async function NavBar() {
  const session = await auth();

  return (
    <div className="navbar ">
      <div className="flex-1 gap-7">
        <Link href={"/shop"} className="text-xl font-bold">
          <Suspense fallback={<Skeleton className="w-20 h-4" />}>
            <HomeIcon />
          </Suspense>
        </Link>
        <NavLinks />
      </div>
      <nav className="flex items-center space-x-5">
        <Link
          href="/shop"
          className="flex flex-row items-center space-x-2 p-2 rounded-full"
        ></Link>
      </nav>
      <div className="flex items-center space-x-6 pr-5 w-fit">
        <SearchComponent placeholder="Search for products..." />
        {session ? (
          <Link href="/profile">
            <Avatar>
              <AvatarFallback className="bg-emerald-400">
                {session.user.lastName[0] + session.user.firstName[0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link href="/api/auth/signin">logIn</Link>
        )}

        <Link href="cart">
          <IoCartOutline size={30} />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
