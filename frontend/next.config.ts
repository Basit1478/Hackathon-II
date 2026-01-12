import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove rewrites to avoid conflicts with direct API calls
  // The API client in lib/api.ts handles the full URL
};

export default nextConfig;
