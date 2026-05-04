import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Payload CMS admin panel and API routes
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ['image/webp'],
    deviceSizes: [320, 390, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance
  experimental: {
    optimizeCss: true,
  },
}

// Wrap with both Payload and next-intl plugins
export default withPayload(withNextIntl(nextConfig))
