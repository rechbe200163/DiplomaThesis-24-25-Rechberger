import SignOutPage from "@/app/auth/signout/page";
import { auth } from "@/auth";
import ProfileIconComponent from "@/components/nav/dashboard/ProfileIconComponent";
import SideNav from "@/components/nav/dashboard/SideNav";
import Search from "@/components/search/SearchComponent";
import { checkUserRole } from "@/lib/utils";

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
      <aside className="flex-none w-full md:w-64 border-r-2 bg-white shadow-md">
        <SideNav />
      </aside>

      {/* Main content */}
      <div className="flex-grow flex flex-col">
        {/* Header with border */}
        <div className="p-4 border-b-2 bg-white shadow-sm flex flex-row items-center gap-4 justify-between">
          <div className="flex flex-col">
            <span className="font-medium text-md text-gray-600">Welcome,</span>
            <h1 className="font-semibold text-lg text-gray-800">
              {session?.user.firstName + " " + session?.user.lastName}
            </h1>
          </div>
          <div className="flex-1 max-w-screen-xl">
            <Search placeholder="Search anything" />
          </div>
          <div className="flex items-center space-x-4 text-gray-600">
            Help Notifications
          </div>
        </div>

        {/* Conditional content based on role */}
        <div className="flex-grow p-4 overflow-auto">
          {session.user.role === "USER" ? user : admin}
        </div>
      </div>
    </div>
  );
}
