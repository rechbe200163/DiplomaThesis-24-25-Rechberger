'use server';

import prisma from '@/prisma/client';
import { authSignUpFormSchema } from '../utils';
import { hash } from 'bcryptjs';
import { FormState } from '../form.types';

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
      console.log(validData.error.flatten().fieldErrors);
      console.log();
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
      console.log('Email already exists');
      return {
        errors: {
          title: ['Email already exists'],
        },
        success: false,
      };
    }

    const pwHash = await hash(password, 12);

    // Create Customer and Cart in a single transaction
    const customer = await prisma.customer.create({
      data: {
        email: email,
        password: pwHash,
        firstName: firstName,
        lastName: lastName,
        companyNumber: companyNumber,
        phoneNumber: phoneNumber,
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
