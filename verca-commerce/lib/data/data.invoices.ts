'server only';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getAvarageOrderValueStats(): Promise<{
  currentMonthAIV: number;
  lastMonthAIV: number;
  percentageChange: number;
}> {
  try {
    const response = await fetch(`${baseApiUrl}/invoices?q=AIVStats`, {
      next: { tags: ['averageOrderValue'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch average order value stats');
  }
}
