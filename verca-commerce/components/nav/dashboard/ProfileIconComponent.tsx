import SignOutPage from "@/app/auth/signout/page";
import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

async function DashboardFooter() {
  const session = await auth();

  const userName = session?.user.firstName + " " + session?.user.lastName;
  const userEmail = session?.user.email;

  return (
    <div className="flex items-center p-3 gap-2" aria-label="User Details">
      <Avatar>
        <AvatarImage
          src={session?.user.image || "/images/default-profile.png"}
          alt={session?.user.name?.split(" ")[0]}
        />
        <AvatarFallback className="bg-emerald-400">
          {session?.user.lastName[0]! + session?.user.firstName![0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span>{userName}</span>
        <span className="text-sm text-gray-600">{userEmail}</span>
      </div>
      <SignOutPage />
    </div>
  );
}

export default DashboardFooter;
