import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 移除旧的 i18n 配置，它在 App Router 中不支持
};

export default withNextIntl(nextConfig);
