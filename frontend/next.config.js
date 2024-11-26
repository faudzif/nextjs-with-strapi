/** @type {import('next').NextConfig} */
const webpack = require('webpack')
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: false,
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    return config
  },
  images: {
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.localhost",
        port: '1337',
      },
      {
        protocol: "https",
        hostname: "*.localhost",
        port: '1337',
      },
      {
        protocol: "https",
        hostname: "*.ol-staging.com",
      },
      {
        protocol: "https",
        hostname: "**.ol-staging.com",
      },
      {
        protocol: "https",
        hostname: "*.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "**.googleapis.com",
      }
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Cache-Control",
            value: "max-age=31536000",
          },
        ],
      },
    ];
  },
  webpack: (config, { dev }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    )
    return config
  }
};

module.exports = nextConfig;
