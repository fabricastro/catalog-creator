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
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
}

export default nextConfig

