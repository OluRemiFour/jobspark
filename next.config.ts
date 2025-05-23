// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "jobai-0obv.onrender.com",
        port: "",
        pathname: "/uploads/**",
      },
      // Add localhost for development
      {
        protocol: "http",
        hostname: "localhost",
        port: "4001",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
