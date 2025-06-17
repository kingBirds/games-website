/** @type {import('next').NextConfig} */

// 重新使用 next-intl 插件
const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts');

const nextConfig = {
  // 其他 Next.js 配置
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.gamemonetize.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.gamemonetize.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'html5.gamemonetize.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = withNextIntl(nextConfig); 