/** @type {import('next').NextConfig} */

// 重新使用 next-intl 插件
const withNextIntl = require('next-intl/plugin')('./src/i18n/request.ts');

const nextConfig = {
  // 其他 Next.js 配置
  reactStrictMode: true,
};

module.exports = withNextIntl(nextConfig); 