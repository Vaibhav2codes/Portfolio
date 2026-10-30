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
          source: "/api/health",
          destination: `${backendUrl}/api/health`
        },
        {
          source: "/api/contact",
          destination: `${backendUrl}/api/contact`
        }
      ]
    };
  },
  async redirects() {
    return [
      {
        // Legacy resume link; the file itself lives in frontend/public.
        source: "/resume.pdf",
        destination: "/Vaibhav_SDE_Resume.pdf",
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
