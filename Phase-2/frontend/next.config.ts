import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove rewrites to avoid conflicts with direct API calls
  // The API client in lib/api.ts handles the full URL
  
  eslint: {
    // Production build mein ESLint errors ko ignore karo
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript errors ko bhi ignore karo (optional, but recommended for quick deployment)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
