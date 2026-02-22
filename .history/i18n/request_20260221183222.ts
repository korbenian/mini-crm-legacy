import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // 1. Если локаль не пришла (undefined), используем 'ru' или 'en' по умолчанию
  const currentLocale = locale || 'ru';

  return {
    // 2. Обязательно возвращаем locale обратно в объект
    locale: currentLocale,
    // 3. Импортируем файл из новой папки в корне
    messages: (await import(`../locales/${currentLocale}/translation.json`)).default
  };
});