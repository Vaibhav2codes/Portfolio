/** @type {import('next').NextConfig} */
const backendUrl = process.env.BACKEND_INTERNAL_URL
  ? `http://${process.env.BACKEND_INTERNAL_URL}`
  : process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const resumeFileName = process.env.NEXT_PUBLIC_RESUME_FILE_NAME
  || process.env.NEXT_PUBLIC_SUPABASE_OBJECT_PATH
  || "Vaibhav_SDE_Resume.pdf";

function trimTrailingSlash(value) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

const resumePublicUrl = process.env.NEXT_PUBLIC_RESUME_URL
  || (
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_BUCKET
      ? `${trimTrailingSlash(process.env.NEXT_PUBLIC_SUPABASE_URL)}/storage/v1/object/public/${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}/${process.env.NEXT_PUBLIC_SUPABASE_OBJECT_PATH || resumeFileName}`
      : null
  );

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
        },
        {
          source: "/api/resume/:path*",
          destination: `${backendUrl}/api/resume/:path*`
        }
      ]
    };
  },
  async redirects() {
    if (!resumePublicUrl) {
      return [];
    }

    return [
      {
        source: "/resume.pdf",
        destination: resumePublicUrl,
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
