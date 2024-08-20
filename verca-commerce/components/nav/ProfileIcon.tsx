import { auth } from "@/auth";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

async function ProfileIcon() {
  const session = await auth();
  return (
    <div>
      <Avatar>
        <AvatarFallback className="bg-emerald-400">
          {session &&
            session.user &&
            session.user.lastName &&
            session.user.firstName &&
            session.user.lastName[0] + session.user.firstName[0]}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}

export default ProfileIcon;
