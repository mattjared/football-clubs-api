/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  // Disable unnecessary features for API-only apps
  images: {
    disableStaticImages: true,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/api/clubs',
      },
    ]
  },
  webpack: (config) => {
    // Exclude client-side modules from the server build
    config.externals.push({
      'react': 'react',
      'react-dom': 'react-dom',
    })
    return config
  },
}

module.exports = nextConfig