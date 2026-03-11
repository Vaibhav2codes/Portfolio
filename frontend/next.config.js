/** @type {import('next').NextConfig} */
const backendUrl = process.env.BACKEND_INTERNAL_URL
  ? `http://${process.env.BACKEND_INTERNAL_URL}`
  : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      },
      {
        protocol: "https",
        hostname: "**.githubusercontent.com"
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/api/contact",
          destination: `${backendUrl}/api/contact`
        },
        {
          source: "/api/resume/:path*",
          destination: `${backendUrl}/api/resume/:path*`
        },
        {
          source: "/resume.pdf",
          destination: `${backendUrl}/api/resume/file`
        }
      ]
    };
  }
};

module.exports = nextConfig;
