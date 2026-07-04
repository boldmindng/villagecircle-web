import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ── Ecosystem packages are consumed from GitHub Packages — must be transpiled
  transpilePackages: [
    '@boldmindng/ui',
    '@boldmindng/utils',
    '@boldmindng/auth',
    '@boldmindng/api-client',
  ],

  // ── Images
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.cloudflare.com' },
      { protocol: 'https', hostname: 'villagecircle.ng' },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // ── Security headers — supplemented by proxy.ts at the edge
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
        ],
      },
    ]
  },

  // ── Redirects: canonical SSO relay path
  async redirects() {
    return [
      {
        source:      '/sso',
        destination: '/api/auth/sso/relay',
        permanent:   false,
      },
    ]
  },

  // ── Strict mode (required by ecosystem standard)
  reactStrictMode: true,

  // ── Logging (Next.js 16.2+)
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },

  experimental: {
    // Enable partial pre-rendering for concept pages (fast TTFB + dynamic waitlist counts)
    ppr: true,
    // Use React 19 compiler
    reactCompiler: true,
  },
}

export default nextConfig