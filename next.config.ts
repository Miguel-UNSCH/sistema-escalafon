import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
  },
  serverExternalPackages: ["pdfkit"],
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
  /* config options here */
};

export default nextConfig;
