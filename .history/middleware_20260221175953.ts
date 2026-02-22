import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Список всех твоих языков
  locales: ['en', 'ru', 'de', 'fr', 'nl', 'pl'],
  
  // Язык по умолчанию, если префикс не указан
  defaultLocale: 'en',

  // Если true, то для дефолтного языка префикс /en не будет отображаться
  localePrefix: 'always' 
});

export const config = {
  // Этот паттерн заставляет middleware работать на всех страницах,
  // кроме статических файлов (картинки, фавикон) и внутренних запросов Next.js
  matcher: ['/', '/(ru|en|de|fr|nl|pl)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};