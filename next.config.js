/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '**',
      },
    ],
    domains: ['cdn.sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
    esmExternals: 'loose',
    serverComponentsExternalPackages: [
      '@sanity/client',
      '@sanity/image-url'
    ],
  },
  async redirects() {
    return [
      {
        source: '/studio',
        destination: '/studio/desk',
        permanent: true,
      },
    ]
  },
  staticPageGenerationTimeout: 180,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['next/babel'],
        },
      },
    });
    return config;
  },
}

module.exports = nextConfig;
