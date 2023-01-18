/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  crossOrigin: 'anonymous',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/legacy/index.html',
      },
      {
        source: '/index.html',
        destination: '/legacy/index.html',
      },
      {
        source: '/writing',
        destination: '/legacy/writing.html',
      },
      {
        source: '/writing.html',
        destination: '/legacy/writing.html',
      },
      {
        source: '/code',
        destination: '/legacy/code.html',
      },
      {
        source: '/code.html',
        destination: '/legacy/code.html',
      },
      {
        source: '/404',
        destination: '/legacy/404.html',
      },
      {
        source: '/404.html',
        destination: '/legacy/404.html',
      },
      {
        source: '/arts',
        destination: '/legacy/arts.html',
      },
      {
        source: '/arts.html',
        destination: '/legacy/arts.html',
      },
      {
        source: '/sitemap',
        destination: '/legacy/sitemap.html',
      },
      {
        source: '/sitemap.html',
        destination: '/legacy/sitemap.html',
      },
      {
        source: '/images/logo-sm-wh.png',
        destination: '/legacy/images/logo-sm-wh.png'
      }
    ]
  }
}

module.exports = nextConfig
