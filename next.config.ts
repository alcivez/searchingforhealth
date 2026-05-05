import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'searchingforhealth.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  // Cloudflare Pages configuration
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
