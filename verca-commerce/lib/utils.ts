import { auth } from "@/auth";
import { type ClassValue, clsx } from "clsx";
import { count } from "console";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

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

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    email: z.string().email(),
    phoneNumber: type === "sign-in" ? z.string().optional() : z.string().min(3),
    password: z.string().min(8),
    firstName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    lastName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    companyNumber:
      type === "sign-in" ? z.string().optional() : z.string().min(3),

    city: type === "sign-in" ? z.string().optional() : z.string().max(50),
    country: type === "sign-in" ? z.string().optional() : z.string().max(50),
    postCode:
      type === "sign-in" ? z.string().optional() : z.string().min(3).max(6),
    state:
      type === "sign-in" ? z.string().optional() : z.string().min(2).max(2),
    streetName: type === "sign-in" ? z.string().optional() : z.string().min(3),
    streetNumber:
      type === "sign-in" ? z.string().optional() : z.string().min(1),
  });
