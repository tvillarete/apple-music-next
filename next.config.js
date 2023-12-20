/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  basePath: "/music",
  assetPrefix: "/music",
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
