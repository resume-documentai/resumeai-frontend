/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (!dev) {
      config.optimization.minimize = true;
    }
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/api/resumes",
        destination: `${process.env.BACKEND_URL}/resumes/`,
      },
      {
        source: "/api/chat",
        destination: `${process.env.BACKEND_URL}/chat/`,
      },
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;