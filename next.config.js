require("dotenv");

const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["zh-HK"],
    defaultLocale: "zh-HK",
  },
  reactStrictMode: true,
  pwa: {
    dest: "public",
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    WEBPUSH_PUBLIC_KEY: process.env.WEBPUSH_PUBLIC_KEY,
  },
};

module.exports = withPWA(nextConfig);
