
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['unsplash.com', 'images.unsplash.com', "plus.unsplash.com", 'api.unsplash.com', 'localhost', '46.226.110.124'],
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
      {
        protocol: "http",
        hostname: "46.226.110.124:1337",
      },
    ],
  },
  // env: {
  //   REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN
  // },
}

module.exports = nextConfig
