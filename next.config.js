/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unsplash.com', 'images.unsplash.com', 'api.unsplash.com', 'localhost'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost:3002/",
      },
    ],
  },
}

module.exports = nextConfig
