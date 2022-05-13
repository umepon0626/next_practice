/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    RESAS_API_KEY: process.env.RESAS_API_KEY,
  }
}

module.exports = nextConfig
