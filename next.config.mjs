/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
    ],
  },
  i18n: {
    locales: ["en", "pl"],
    defaultLocale: "en",
  },
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
};

export default nextConfig;
