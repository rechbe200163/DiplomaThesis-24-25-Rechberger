'server only';

import prisma from '@/prisma/client';
import { supabaseClient } from '../supabaseClient';
import { revalidateTag } from 'next/cache';
import { auth } from '@/auth';

export async function uploadAvatar(
  fileBuffer: Uint8Array,
  customerReference: number
) {
  const imageBucket = process.env.SUPABASE_IMAGE_BUCKET; // Supabase bucket name
  const fileName = `avatars/avatar_${customerReference}.png`;
  // Upload the PDF to the Supabase storage
  const { data, error } = await supabaseClient.storage
    .from(imageBucket!) // supabase bucket which stores the images
    .upload(fileName, fileBuffer, {
      contentType: 'image/*', // data type of the file
      upsert: true, // update the file if it already exists
    });

  if (error) {
    throw new Error('Failed to upload invoice PDF');
  }

  // Update the user data in the database
  await updateUserData(customerReference, data.path);

  return data.path;
}

async function updateUserData(customerReference: number, avatarPath: string) {
  try {
    await prisma.customer.update({
      where: {
        customerReference,
      },
      data: {
        avatarPath: avatarPath,
      },
    });
  } catch (error) {
    throw new Error('Failed to update user data');
  }
}

export async function processImage(file: File) {
  const session = await auth();
  if (!session) {
    return {
      success: false,
      errors: {
        title: ['Not authenticated'],
      },
    };
  }
  try {
    if (file.size === 0) {
      return {
        success: false,
        errors: {
          title: ['No file selected'],
        },
      };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    uploadAvatar(buffer, session.user.customerReference!);

    revalidateTag('avatar');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errors: { title: ['Could not upload file', error as string] },
    };
  }
}
