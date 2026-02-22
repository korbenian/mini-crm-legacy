// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }:any) => {
  return {
    locale,
    messages: (await import(`../locales/${locale}/translation.json`)).default
  };
});