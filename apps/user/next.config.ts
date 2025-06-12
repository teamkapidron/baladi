import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'www.baladiengros.no',
      },
      {
        protocol: 'https',
        hostname: 'baladiengros.no',
      },
    ],
  },
};

export default nextConfig;
