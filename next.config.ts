import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/roadmap.html", destination: "/roadmap", permanent: true },
    ]
  },
}

export default nextConfig
