import SignOutPage from "@/app/auth/signout/page";
import UserDetailsCard from "@/components/cards/profile/UserDetailsCard";
import React from "react";

const UserProfile = () => {
  return (
    <div>
      <SignOutPage />
      <UserDetailsCard />
    </div>
  );
};

export default UserProfile;
