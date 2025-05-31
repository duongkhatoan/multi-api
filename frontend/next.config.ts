import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Additional config for error handling
  experimental: {
    // These might help with error boundary behavior
    // but they are optional
  },
};

export default nextConfig;
