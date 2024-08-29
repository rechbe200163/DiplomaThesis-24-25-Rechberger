import { auth } from "@/auth";
import HeaderBox from "@/components/header/HeaderBox";
import InteractiviyComponent from "@/components/nav/dashboard/InteractiviyComponent";
import ProfileIconComponent from "@/components/nav/dashboard/ProfileIconComponent";
import SideNav from "@/components/nav/dashboard/SideNav";
import Search from "@/components/search/SearchComponent";
import { Header } from "@radix-ui/react-accordion";
import { Inter } from "next/font/google";
import { Suspense } from "react";

export default async function Layout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const session = await auth();
  console.log("role", session?.user.role);
  if (!session?.user.role) {
    return (
      <div className="flex h-screen items-center justify-center">
        Please Log in
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside className="flex-none w-full md:w-64 border-r-2 bg-white shadow-md flex flex-col justify-between">
        <div>
          <Suspense fallback={<div>Loading SideNav...</div>}>
            <SideNav />
          </Suspense>
        </div>
        <div className="p-4">
          <Suspense fallback={<div>Loading ProfileIcon...</div>}>
            <ProfileIconComponent />
          </Suspense>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {/* Header with border */}
        <div className="p-4 border-b-2 bg-white shadow-sm flex flex-row items-center gap-4 justify-between">
          <HeaderBox
            title="Welcome,"
            subtext="welcome to your dashboard"
            name={session.user.lastName}
            type="greeting"
          />
          <Suspense fallback={<div>Loading InteractiviyComponent...</div>}>
            <InteractiviyComponent />
          </Suspense>
        </div>

        {/* Conditional content based on role */}
        <div className="flex-grow p-4 overflow-auto">
          {session.user.role === "USER" ? (
            <Suspense fallback={<div>Loading...</div>}>{user}</Suspense>
          ) : (
            <Suspense fallback={<div>Loading...</div>}>{admin}</Suspense>
          )}
        </div>
      </div>
    </div>
  );
}
