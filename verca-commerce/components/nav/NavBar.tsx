import React, { Suspense } from "react";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { IoCartOutline, IoHomeOutline } from "react-icons/io5";
import HomeIcon from "./HomeIcon";
import { Skeleton } from "../ui/skeleton";
// import SearchComponent from "../search/SearchComponent";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import CartIconComponent from "./CartIconComponent";

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
      <div className="flex items-center space-x-6 pr-5 w-fit">
        {/* <SearchComponent placeholder="Search for products..." /> */}
        <CartIconComponent />
        {session ? (
          <Link href="/profile">
            <Avatar>
              <AvatarImage
                src={session.user.image || "/images/default-profile.png"}
                alt={session.user.name?.split(" ")[0]}
              />
              <AvatarFallback className="bg-emerald-400">
                {session.user.lastName[0] + session.user.firstName![0]}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link href="/auth/signin">logIn</Link>
        )}
      </div>
    </div>
  );
}

export default NavBar;
