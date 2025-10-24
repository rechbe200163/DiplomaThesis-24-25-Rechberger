'use server';
import { auth } from '@/auth';
import { FormState } from '../form.types';
import prisma from '@/prisma/client';
import { addressFormSchema } from '../utils';
import { title } from 'process';
import { revalidateTag } from 'next/cache';

export async function updateAddress(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const session = await auth();
    if (!session) {
      return {
        success: false,
        errors: {
          title: ['User not authenticated'],
        },
      };
    }

    const validData = addressFormSchema.safeParse({
      streetNumber: formData.get('streetNumber') as string,
      streetName: formData.get('streetName') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      postCode: formData.get('postCode') as string,
      country: formData.get('country') as string,
    });

    if (!validData.success) {
      return {
        success: false,
        errors: {
          title: ['Invalid form data'],
        },
      };
    }

    const customerReference = session.user.customerReference;

    // Find the customer's address
    const currentAddress = await prisma.address.findFirst({
      where: {
        customers: {
          some: {
            customerReference: customerReference,
          },
        },
      },
    });

    if (!currentAddress) {
      return {
        success: false,
        errors: {
          title: ['Address not found'],
        },
      };
    }

    // soft delete the current address
    await prisma.address.update({
      where: {
        addressId: currentAddress.addressId,
      },
      data: {
        deleted: true,
      },
    });

    // create the new address and link it to the customer
    const newAddress = await prisma.address.create({
      data: {
        streetNumber: validData.data.streetNumber,
        streetName: validData.data.streetName,
        city: validData.data.city,
        state: validData.data.state,
        postCode: validData.data.postCode,
        country: validData.data.country,
        customers: {
          connect: {
            customerReference: customerReference,
          },
        },
      },
    });

    revalidateTag(`address-${customerReference}`);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: {
        title: ['Could not add product to cart'],
      },
    };
  }
}
