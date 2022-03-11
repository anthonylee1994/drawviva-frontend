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
    API_BASE_URL: "https://api.drawviva.com",
    WEBPUSH_PUBLIC_KEY:
      "BJIqpF5XQm25HZ4BCx7isd7IpbBX_MdD4vEuw8q9rNrPrhEJswz9s9Mf7BuC89Pn1c1NXMbjm2qvQXYeQNU710k",
  },
};

module.exports = withPWA(nextConfig);
