import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  // eslint: { ignoreDuringBuilds: true }

  // cacheComponents: true,

  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV !== 'production',
    },
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

// export default nextConfig;

const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/pkg/locale/request.ts',
  experimental: {
    createMessagesDeclaration: './translations/en.json',
  },
});
export default withNextIntl(nextConfig);
