import { auth } from '@/auth';
import { BusinessSector } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';
import { count } from 'console';
import { twMerge } from 'tailwind-merge';
import { z } from 'zod';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formattedPrice = (price / 100).toLocaleString('de-at', {
    style: 'currency',
    currency: 'EUR',
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

export const authSignUpFormSchema = () =>
  z
    .object({
      firstName: z.string().min(1, 'First name is required'),
      lastName: z.string().min(1, 'Last name is required'),
      email: z.string().email('Invalid email address'),
      phoneNumber: z.string().min(1, 'Phone number is required'),

      companyNumber: z.string().min(1, 'Company number is required'),
      businessSector: z.enum([
        BusinessSector.AGRICULTURE,
        BusinessSector.CONSTRUCTION,
        BusinessSector.EDUCATION,
        BusinessSector.FINANCE,
        BusinessSector.HEALTH,
        BusinessSector.HOSPITALITY,
        BusinessSector.MANUFACTURING,
        BusinessSector.RETAIL,
        BusinessSector.TECHNOLOGY,
        BusinessSector.TRANSPORTATION,
      ]),
      city: z.string().min(1, 'City is required'),
      country: z.string().min(1, 'Country is required'),
      postCode: z.string().min(1, 'Postal code is required'),
      state: z.string().min(1, 'State is required'),
      streetNumber: z.string().min(1, 'Street number is required'),
      streetName: z.string().min(1, 'Street name is required'),

      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z
        .string()
        .min(6, 'Confirm password must be at least 6 characters'),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Passwords do not match',
      path: ['confirmPassword'],
    });

export const authSignInFormSchema = () =>
  z.object({
    // sign
    email: z.string().email(),
    password: z.string().min(8),
  });
