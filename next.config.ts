import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  // eslint: { ignoreDuringBuilds: true }
};

// export default nextConfig;

const withNextIntl = createNextIntlPlugin("./src/pkg/locale/request.ts");
export default withNextIntl(nextConfig);
