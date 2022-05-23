/** @type {import('next').NextConfig} */
const nextConfig = {
  darkMode: 'class',
  reactStrictMode: true,
  images: {
    domains: ['cdn.weatherapi.com'],
  },
  i18n: {
    localeDetection: true,
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
