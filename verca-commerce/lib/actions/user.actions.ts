'use server';
import { FormState } from './../form.types';
import prisma from '@/prisma/client';
import {
  accountFormSchema,
  authSignUpFormSchema,
  comparePasswords,
  formatDateTime,
  generateCustomerRefercenceNumber,
  hashUserPassword,
  newCustomerFormSchema,
  passwordFormSchema,
  sendNotificationEmail,
} from '../utils';
import { processImage } from '../services/user.services';
import { auth } from '@/auth';
import { revalidateTag } from 'next/cache';
import { BusinessSector, Role } from '@prisma/client';

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

    const pwHash = await hashUserPassword(password);

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
          create: {
            city: city,
            country: country,
            postCode: postCode,
            state: state,
            streetName: streetName,
            streetNumber: streetNumber,
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
  try {
    // Authenticate the current session to ensure the user is logged in
    const session = await auth();
    if (!session) {
      // If no session is found, return an error indicating login is required
      return {
        success: false,
        errors: {
          title: ['You need to be logged in to update your account'],
        },
      };
    }

    // check if form data is empty
    if (
      !formData.get('currentPassword') ||
      !formData.get('newPassword') ||
      !formData.get('confirmPassword')
    ) {
      return {
        success: false,
        errors: {
          title: ['Please fill in all fields'],
        },
      };
    }

    // Validate the form data against the schema
    const validData = passwordFormSchema.safeParse({
      currentPassword: formData.get('currentPassword') as string,
      newPassword: formData.get('newPassword') as string,
      confirmPassword: formData.get('confirmPassword') as string,
    });
    console.log(validData.error?.message);
    if (!validData.success) {
      // Return an error if the validation fails
      return {
        success: false,
        errors: {
          title: [`${validData.error?.message}`],
        },
      };
    }

    // Fetch the customer record from the database using the session's customer reference
    const customer = await prisma.customer.findUnique({
      where: { customerReference: session.user.customerReference },
    });

    if (!customer) {
      // If no customer is found, return an error indicating this
      return {
        success: false,
        errors: {
          title: ['Customer not found'],
        },
      };
    }

    // Compare the provided current password with the stored password
    if (!comparePasswords(validData.data.currentPassword, customer.password)) {
      // If the passwords do not match, return an error
      return {
        success: false,
        errors: {
          title: ['Current password is incorrect'],
        },
      };
    }

    // Update the customer's password in the database with the newly hashed password
    await prisma.customer.update({
      where: { customerReference: customer.customerReference },
      data: { password: await hashUserPassword(validData.data.newPassword) },
    });

    // Send a notification email to the customer about the password change
    sendNotificationEmail(
      customer!.email, // Customer's email address
      'password', // Notification type
      `${customer.firstName} ${customer.lastName}`, // Full name for personalization
      formatDateTime(customer.modifiedAt!) // Timestamp of modification
    );

    // Return a success response after all operations complete successfully
    return { success: true };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('error from updatePassword', error);

    // Return a generic error response to the user
    return {
      success: false,
      errors: {
        title: ['An unexpected error occurred. Please try again later.'],
      },
    };
  }
}

export async function deleteUser(
  customerReference: number,
  prevState: FormState
): Promise<FormState> {
  try {
    // Fetch the customer record from the database using the provided customer reference
    const customer = await prisma.customer.findUnique({
      where: { customerReference },
    });

    if (!customer) {
      // If no customer is found, return an error indicating this
      return {
        success: false,
        errors: {
          title: ['Customer not found'],
        },
      };
    }

    // soft Delete the customer's record from the database with deleted attribute cascade to cart
    await prisma.customer.update({
      where: { customerReference },
      data: { deleted: true },
    });

    // Return a success response after the deletion operation completes successfully
    revalidateTag('customersPaging');
    return { success: true };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('error from deleteUser', error);

    // Return a generic error response to the user
    return {
      success: false,
      errors: {
        title: ['An unexpected error occurred. Please try again later.'],
      },
    };
  }
}

export async function restoreUser(
  customerReference: number,
  prevState: FormState
): Promise<FormState> {
  try {
    // Fetch the customer record from the database using the provided customer reference
    const customer = await prisma.customer.findUnique({
      where: { customerReference },
    });

    if (!customer) {
      // If no customer is found, return an error indicating this
      return {
        success: false,
        errors: {
          title: ['Customer not found'],
        },
      };
    }

    // Restore the customer's record from the database with deleted attribute cascade to cart
    await prisma.customer.update({
      where: { customerReference },
      data: { deleted: false },
    });

    // Return a success response after the restoration operation completes successfully
    revalidateTag('customersPaging');
    return { success: true };
  } catch (error) {
    // Log the error for debugging purposes
    console.error('error from restoreUser', error);

    // Return a generic error response to the user
    return {
      success: false,
      errors: {
        title: ['An unexpected error occurred. Please try again later.'],
      },
    };
  }
}

export async function addCustomer(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await auth();
    if (!session) {
      return {
        success: false,
        errors: {
          title: ['Not authenticated'],
        },
      };
    }

    console.log('formData', formData);

    const validData = newCustomerFormSchema.safeParse({
      firstName: formData.get('firstName')?.toString() || null,
      lastName: formData.get('lastName')?.toString() || null,
      email: formData.get('email')?.toString() || null,
      phoneNumber: formData.get('phoneNumber')?.toString() || null,
      businessSector:
        (formData.get('businessSector') as BusinessSector) || null,
      companyNumber: formData.get('companyNumber')?.toString() || null,
      address: formData.get('addressId')?.toString() || null,
      role: (formData.get('role') as Role) || null,
    });

    console.log('validData', validData.error?.flatten());

    if (!validData.success) {
      return {
        success: false,
        errors: {
          title: ['Invalid form data'],
        },
      };
    }

    const customerReference = generateCustomerRefercenceNumber();

    // check for customer with same customer

    const checkForExistingEmail = await prisma.customer.findUnique({
      where: {
        email: validData.data.email,
      },
    });

    if (checkForExistingEmail) {
      return {
        success: false,
        errors: {
          title: ['Email already exists'],
        },
      };
    }

    const hashPwd = await hashUserPassword('password');

    console.log('Prisma create input:', {
      email: validData.data.email,
      password: hashPwd,
      firstName: validData.data.firstName,
      lastName: validData.data.lastName,
      companyNumber: validData.data.companyNumber,
      phoneNumber: validData.data.phoneNumber,
      customerReference,
      businessSector: validData.data.businessSector,
      address: {
        connect: formData.get('addressId') as string,
      },
      cart: { create: {} },
    });

    const customer = await prisma.customer.create({
      data: {
        email: validData.data.email,
        password: hashPwd,
        firstName: validData.data.firstName,
        lastName: validData.data.lastName,
        companyNumber: validData.data.companyNumber,
        phoneNumber: validData.data.phoneNumber,
        customerReference: customerReference,
        businessSector: validData.data.businessSector,
        address: {
          connect: {
            addressId: formData.get('addressId') as string,
          },
        },
        cart: {
          create: {},
        },
      },
    });

    if (!customer) {
      return {
        success: false,
        errors: {
          title: ['Failed to add customer'],
        },
      };
    }

    console.log('customercustomer', customer);

    return {
      success: true,
      message: `Customer ${customer.firstName} ${customer.lastName} added successfully`,
    };
  } catch (error) {
    console.log('error from addCustomer', error);
    return {
      success: false,
      errors: {
        title: ['Something went wrong', error + ''],
      },
    };
  }
}
