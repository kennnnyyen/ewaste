import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  async redirects() {
    return [{ source: "/blog/:path*", destination: "/blogs/:path*", permanent: true }];
  },
  experimental: {
    agentUpgrade: "security",
  },
};

export default nextConfig;
