import { auth } from "@/auth";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formattedPrice = (price / 100).toLocaleString("de-at", {
    style: "currency",
    currency: "EUR",
  });

  return formattedPrice;
}

export async function checkUserRole() {
  const session = await auth();

  console.log(session);

  if (!session) {
    return null;
  }

  return session.user.role;
}
