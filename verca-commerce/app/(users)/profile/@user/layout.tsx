import SignOutPage from "@/app/auth/signout/page";
import ProfileIconComponent from "@/components/nav/dashboard/ProfileIconComponent";
import SideNav from "@/components/nav/dashboard/SideNav";
import { checkUserRole } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-grow ">
      <div>{children}</div>
    </div>
  );
}
