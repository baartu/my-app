/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: process.env.NODE_ENV === 'production' ? '/my-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-app/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;