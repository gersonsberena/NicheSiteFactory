import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  outputFileTracingIncludes: {
    "/": ["./prospects/configs/**", "./templates/football-coach/sport-templates/**"],
  },
};

export default nextConfig;
