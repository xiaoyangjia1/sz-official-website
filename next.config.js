/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  env: {
    baseURL: "http://47.115.228.82:81/api",
  },
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;
