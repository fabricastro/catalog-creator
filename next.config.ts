import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  typescript: {
    // This will allow the build to succeed even with TypeScript errors
    ignoreBuildErrors: true,
  },
  // Disable ESLint during the build process
  eslint: {
    // This will allow the build to succeed even with ESLint errors
    ignoreDuringBuilds: true,
  },
}

export default nextConfig

