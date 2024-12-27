import { auth } from '@/auth';
import { BusinessSector } from '@prisma/client';
import { type ClassValue, clsx } from 'clsx';

import { twMerge } from 'tailwind-merge';
import { z } from 'zod';
import { customAlphabet } from 'nanoid';
import { supabaseClient } from './supabaseClient';
import { resend } from './resendClient';
import NotificationEmail from '@/app/auth/emails/notification-email';
import { compare, hash } from 'bcryptjs';

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

export function formatDateTime(date: Date) {
  const formattedDate = new Date(date).toLocaleDateString('de-AT', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return formattedDate;
}

export function generateCustomerRefercenceNumber(): number {
  const nanoid = customAlphabet('1234567890', 9);
  return Number(nanoid());
}

export async function hashUserPassword(password: string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function checkUserRole() {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session.user.role;
}

export async function getSignedURL(imagePath: string): Promise<string | null> {
  const bucket = process.env.SUPABASE_IMAGE_BUCKET;
  const { data, error } = await supabaseClient.storage
    .from(bucket!)
    .createSignedUrl(imagePath, 315000000);
  if (error) {
    console.error('Error Generating Signed URL', error);
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

export async function sendNotificationEmail(
  to: string,
  type: 'email' | 'password',
  username: string,
  changeTime: string
) {
  try {
    const data = await resend.emails.send({
      from: 'Verca Commerce <updates.mrhost.uk>',
      to: [to],
      subject: `${type.charAt(0).toUpperCase() + type.slice(1)} Change Notification`,
      react: NotificationEmail({ type, username, changeTime }),
    });

    console.log('Email sent successfully:', data);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isPasswordValid = await compare(password, hashedPassword);
  return isPasswordValid;
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

export const accountFormSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phoneNumber: z
    .string()
    .min(1, {
      message: 'Phone number is required.',
    })
    .optional(),
  businessSector: z
    .enum([
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
    ])
    .optional()
    .nullable(),
  companyNumber: z
    .string()
    .min(1, {
      message: 'Company number is required.',
    })
    .optional()
    .nullable(),
  profilePicture: z.instanceof(File).optional(),
});

export const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    newPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
