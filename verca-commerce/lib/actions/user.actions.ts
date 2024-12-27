'use server';
import { FormState } from './../form.types';
import prisma from '@/prisma/client';
import {
  authSignUpFormSchema,
  generateCustomerRefercenceNumber,
} from '../utils';
import { hash } from 'bcryptjs';
import { processImage } from '../services/user.services';

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
  console.log(formData);
  if (formData.get('avatarPath')) {
    return processImage(formData.get('avatarPath') as File);
  }
  return {
    success: true,
    message: 'Account updated successfully',
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
