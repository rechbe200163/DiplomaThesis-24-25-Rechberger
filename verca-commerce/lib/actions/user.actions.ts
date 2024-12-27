'use server';
import { FormState } from './../form.types';
import prisma from '@/prisma/client';
import {
  accountFormSchema,
  authSignUpFormSchema,
  formatDateTime,
  generateCustomerRefercenceNumber,
  sendNotificationEmail,
} from '../utils';
import { hash } from 'bcryptjs';
import { processImage } from '../services/user.services';
import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';
import { BusinessSector } from '@prisma/client';

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

export async function updateAccount(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      errors: {
        title: ['You need to be logged in to update your account'],
      },
    };
  }
  const validData = accountFormSchema.safeParse({
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    businessSector: formData.get('businessSector') as BusinessSector,
    companyNumber: formData.get('companyNumber') as string,
  });

  if (!validData.success) {
    return {
      success: false,
      errors: {
        title: ['Invalid form data'],
      },
    };
  }

  if (validData.data.email !== session.user.email) {
    await sendNotificationEmail(
      validData.data.email,
      'email',
      `${session.user.firstName} ${session.user.lastName}`,
      formatDateTime(new Date())
    );
  }

  const customer = await prisma.customer.update({
    where: {
      customerReference: session.user.customerReference,
    },
    data: {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phoneNumber: formData.get('phoneNumber') as string,
      businessSector: formData.get('businessSector') as BusinessSector,
      companyNumber: formData.get('companyNumber') as string,
    },
  });

  revalidateTag('customer');

  if (formData.get('avatarPath')) {
    return await processImage(formData.get('avatarPath') as File);
  }

  return {
    success: true,
  };
}

export async function updatePassword(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  return {
    success: true,
    message: 'Account updated successfully',
  };
}
