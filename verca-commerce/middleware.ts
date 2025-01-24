import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, Locale, locales } from './i18n/config';
import { getUserLocale, setUserLocale } from './services/locale';

const PUBLIC_FILE = /\.(.*)$/;
export async function middleware(req: NextRequest) {
  const acceptLanguage = req.headers.get('accept-language');

  let locale = defaultLocale;
  if (acceptLanguage) {
    const supportedLocales = locales;
    const extractedLocale = acceptLanguage
      .split(',')[0]
      .split('-')[0] as Locale;
    locale = supportedLocales.includes(extractedLocale)
      ? extractedLocale
      : defaultLocale;

    await setUserLocale(locale as Locale);
  }

  const userLocale = await getUserLocale();
  console.log('User locale:', userLocale);

  const response = NextResponse.next();
  response.headers.set('x-user-locale', userLocale);
  return response;
}
