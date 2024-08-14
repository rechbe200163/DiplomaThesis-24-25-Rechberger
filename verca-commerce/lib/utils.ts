import { auth } from "@/auth";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function checkUserRole() {
  const session = await auth();

  console.log(session);

  if (!session) {
    return null;
  }

  return session.user.role;
}
