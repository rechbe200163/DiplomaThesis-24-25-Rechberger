import { SiteConfig } from '@prisma/client';

const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${baseApiUrl}/siteConfig`, {
      next: { tags: ['siteConfig'] },
    });

    const siteConfig = await res.json();
    return siteConfig;
  } catch (error) {
    throw new Error('Failed to fetch site config');
  }
}
