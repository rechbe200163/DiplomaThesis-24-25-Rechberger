'use server';
import { FormState } from './../form.types';
import prisma from '@/prisma/client';
import {
  authSignUpFormSchema,
  generateCustomerRefercenceNumber,
} from '../utils';
import { hash } from 'bcryptjs';
import { auth } from '@/auth';
import { uploadAvatar } from '../services/user.services';
import { revalidateTag } from 'next/cache';

export async function signUp(
  email: string,
  password: string,
  confirmPassword: string,
  firstName: string,
  lastName: string,
  companyNumber: string,
  businessSector: string,
  phoneNumber: string,
  city: string,
  country: string,
  postCode: string,
  state: string,
  streetName: string,
  streetNumber: string
): Promise<FormState> {
  try {
    const validData = authSignUpFormSchema().safeParse({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      companyNumber,
      businessSector,
      phoneNumber,
      city,
      country,
      postCode,
      state,
      streetName,
      streetNumber,
    });

    if (!validData.success) {
      return {
        success: false,
        errors: {
          title: ['Invalid form data'],
        },
      };
    }

    const chekForExitingEmail = await prisma.customer.findUnique({
      where: {
        email: email,
      },
    });

    if (chekForExitingEmail) {
      return {
        errors: {
          title: ['Email already exists'],
        },
        success: false,
      };
    }

    const pwHash = await hash(password, 12);

    const customerReference = generateCustomerRefercenceNumber();

    // Create Customer and Cart in a single transaction
    const customer = await prisma.customer.create({
      data: {
        email: email,
        password: pwHash,
        firstName: firstName,
        lastName: lastName,
        companyNumber: companyNumber,
        phoneNumber: phoneNumber,
        customerReference: customerReference,
        address: {
          connectOrCreate: {
            where: {
              city_country_postcode_state_streetName_streetNumber: {
                city: city,
                country: country,
                postcode: postCode,
                state: state,
                streetName: streetName,
                streetNumber: streetNumber,
              },
            },
            create: {
              city: city,
              country: country,
              postcode: postCode,
              state: state,
              streetName: streetName,
              streetNumber: streetNumber,
            },
          },
        },
        cart: {
          create: {}, // Create an empty cart
        },
      },
    });

    return {
      success: true,
      message: `Welcome ${customer.firstName} ${customer.lastName} you can now login`,
    };
  } catch (error) {
    console.error('error from signUp', error);
    return {
      errors: {
        title: ['Something went wrong'],
      },
      success: false,
    };
  }
}

export async function processImage(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session || !session.user) {
    return {
      success: false,
      errors: {
        title: ['Please sign in to upload a profile picture'],
      },
    };
  }
  try {
    const file = formData.get('file') as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    uploadAvatar(buffer, session.user.customerReference!);

    revalidateTag('user');
    return { success: true };
  } catch (error) {
    console.error('error from uploadProfilePicture', error);
    return {
      success: false,
      errors: { title: ['Could not upload file', error as string] },
    };
  }
}
