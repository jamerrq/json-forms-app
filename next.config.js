/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remote: ['avatars.githubusercontent.com']
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      }
    ]
  }
}

module.exports = nextConfig
