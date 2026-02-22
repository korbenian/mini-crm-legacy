import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }:any) => {
    const currentLocale = locale || 'en';
  return {
    locale: currentLocale,
    messages: (await import(`../app/[locale]/locales/${locale}/translation.json`)).default
  };
});