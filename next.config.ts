import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  images: {
    // Replaced the deprecated images.domains array with explicit remotePatterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-live-supabase-project.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'api.placeholder',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  typescript: {
    ignoreBuildErrors: false, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
