import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }:any) => {
  return {
    locale,
    messages: (await import(`@/locales/${locale}/translantation.json`)).default
  };
});