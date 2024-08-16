import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { PowerOff } from "lucide-react";
import { BiLogOut } from "react-icons/bi";

export default function SignOutPage() {
  return (
    <div>
      <form
        action={async (formData) => {
          "use server";
          await signOut();
        }}
      >
        <div className="flex flex-row">
          <button className="btn btn-ghost" type="submit">
            <BiLogOut className="text-2xl" />
          </button>
        </div>
      </form>
    </div>
  );
}
