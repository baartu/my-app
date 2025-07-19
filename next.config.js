/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: process.env.NODE_ENV === 'production' ? '/my-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-app/' : '',
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;