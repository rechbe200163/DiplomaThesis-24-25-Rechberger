import { Category } from '@prisma/client';
const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${baseApiUrl}/categories`, {
      next: { tags: ['categories'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch addresses');
  }
}
