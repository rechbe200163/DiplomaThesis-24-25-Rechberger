'server only';

import prisma from '@/prisma/client';
import { supabaseClient } from '../supabaseClient';

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
    console.error('Error uploading invoice PDF:', error);
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
    console.error('Error updating user data:', error);
    throw new Error('Failed to update user data');
  }
}
