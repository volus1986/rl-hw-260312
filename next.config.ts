import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  // eslint: { ignoreDuringBuilds: true }

  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV !== 'production',
    },
  },
};

// export default nextConfig;

const withNextIntl = createNextIntlPlugin('./src/pkg/locale/request.ts');
export default withNextIntl(nextConfig);
