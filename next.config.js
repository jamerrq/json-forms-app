/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remote: ['avatars.githubusercontent.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'img.shields.io'
      }
    ]
  }
}

module.exports = nextConfig
