import { auth } from "@/auth";
import { Link } from "lucide-react";
import React, { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback } from "../ui/avatar";

async function ProfileIconComponent() {
  const session = await auth();

  // session.user.name is the user's full name -> "Doe John"
  const firstName = session?.user.firstName!;
  const lastName = session?.user.lastName!;

  return (
    <>
      {session ? (
        <Link href="/profile">
          <Avatar>
            <AvatarFallback className="bg-emerald-400">
              {lastName[0] + firstName[0]}
            </AvatarFallback>
          </Avatar>
        </Link>
      ) : (
        <Link href="/api/auth/signin">logIn</Link>
      )}
    </>
  );
}

export default ProfileIconComponent;
