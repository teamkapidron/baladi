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
      {
        protocol: 'https',
        hostname: 'baladi-prod-baladibucket-snxbbhrn.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
