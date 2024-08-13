import { signOut } from "@/auth";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/shop" });
      }}
    >
      <button type="submit">Sign Out</button>
    </form>
  );
}
