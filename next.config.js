/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  
  // GitHub Pages için gerekli ayarlar
  basePath: process.env.NODE_ENV === 'production' ? '/my-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-app/' : '',
  trailingSlash: true,
  output: 'export',
  
  // Images ayarları
  images: {
    unoptimized: true, // GitHub Pages için gerekli
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
