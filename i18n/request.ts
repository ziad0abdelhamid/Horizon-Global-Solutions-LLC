import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async (context) => {
  // requestLocale is a Promise in Next.js 14+
  const locale = await context.requestLocale;
  const finalLocale = locale && routing.locales.includes(locale as any)
    ? locale
    : routing.defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});