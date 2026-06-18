import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "rinepaoqofwfsvwrwhkd.supabase.co",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@clerk/nextjs/server': path.resolve(__dirname, 'src/lib/clerk-server-mock.ts'),
      '@clerk/nextjs/legacy': path.resolve(__dirname, 'src/lib/clerk-mock.tsx'),
      '@clerk/nextjs': path.resolve(__dirname, 'src/lib/clerk-mock.tsx'),
    };
    return config;
  },
  turbopack: {
    resolveAlias: {
      '@clerk/nextjs/server': './src/lib/clerk-server-mock.ts',
      '@clerk/nextjs/legacy': './src/lib/clerk-mock.tsx',
      '@clerk/nextjs': './src/lib/clerk-mock.tsx',
    },
  },
};

export default nextConfig;
