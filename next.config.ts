import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除旧的 i18n 配置，它在 App Router 中不支持
  
  // 域名和环境配置
  env: {
    SITE_URL: 'https://freecasualgame.com',
    SITE_NAME: 'FreeCasualGame.com',
  },
  
  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'img.gamemonetize.com',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'gamemonetize.com',
        pathname: '/**',
      },
    ],
  },
  
  // 压缩配置
  compress: true,
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['@headlessui/react'],
  },
};

export default withNextIntl(nextConfig);
