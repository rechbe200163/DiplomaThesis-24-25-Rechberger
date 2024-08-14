import { checkUserRole } from "@/lib/utils";

export default async function Layout({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const role = await checkUserRole();
  console.log("role", role);
  if (!role) {
    return null;
  }

  return <>{role === "USER" ? user : admin}</>;
}
