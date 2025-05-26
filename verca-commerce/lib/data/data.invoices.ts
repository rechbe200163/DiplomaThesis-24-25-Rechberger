'server only';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getSalesStats(): Promise<{
  currentMonthSales: number;
  lastMonthSales: number;
  percentageChange: number;
}> {
  try {
    const response = await fetch(`${baseApiUrl}/invoices?q=salesStats`, {
      next: { tags: ['salesStats'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch sales stats');
  }
}

export async function getRevenueStats(): Promise<{
  currentMonthRevenue: number;
  lastMonthRevenue: number;
  percentageChange: number;
}> {
  try {
    const response = await fetch(`${baseApiUrl}/invoices?q=revenueStats`, {
      next: { tags: ['revenueStats'] },
    });
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch revenue stats');
  }
}
