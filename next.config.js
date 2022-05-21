/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.weatherapi.com'],
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
  },
};

module.exports = nextConfig;
