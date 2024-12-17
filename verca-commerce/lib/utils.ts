import { auth } from '@/auth';
import { BusinessSector } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';
import { supabaseClient } from './supabaseClient';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  const formattedPrice = (price / 100).toLocaleString('de-AT', {
    style: 'currency',
    currency: 'EUR',
  });

  return formattedPrice;
}

export function formatDate(date: Date) {
  const formattedDate = new Date(date).toLocaleDateString('de-AT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return formattedDate;
}

export function generateCustomerRefercenceNumber(): number {
  const nanoid = customAlphabet('1234567890', 9);
  return Number(nanoid());
}

export async function checkUserRole() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session.user.role;
}

export async function getSignedURL(
  imagePath: string,
  width: number,
  height: number
): Promise<string | null> {
  const bucket = process.env.SUPABASE_IMAGE_BUCKET;
  const { data, error } = await supabaseClient.storage
    .from(bucket!)
    .createSignedUrl(imagePath, 315000000);
  if (error) {
    console.error(error);
    return null;
  }
  return data.signedUrl;
}

export async function generatePdfUrl(pdfPath: string): Promise<string> {
  const bucket = process.env.SUPABASE_INVOICE_BUCKET;
  const { data, error } = await supabaseClient.storage
    .from(bucket!)
    .createSignedUrl(pdfPath, 60 * 60 * 365 * 10); // 10 years
  if (error) {
    console.error(error);
    return error + '';
  }
  return data.signedUrl;
  // redirect(data.signedUrl, RedirectType.push); // Redirect to the PDF in the same tab with adding a new entry to the history stack of the browser
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
