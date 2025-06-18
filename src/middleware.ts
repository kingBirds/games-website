import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';

// 简化的中间件，只处理国际化路由
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 如果是静态资源、特殊文件或API路由，直接返回
  if (pathname.startsWith('/api') || 
      pathname.startsWith('/_next') || 
      pathname.startsWith('/locales/') ||
      pathname === '/ads.txt' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname.includes('.')) {
    return NextResponse.next();
  }
  
  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // 如果路径已经包含语言前缀，直接返回
  if (pathnameHasLocale) {
    return NextResponse.next();
  }
  
  // 重定向到默认语言路径
  const redirectUrl = new URL(
    `/${defaultLocale}${pathname === '/' ? '' : pathname}`,
    request.url
  );
  
  return NextResponse.redirect(redirectUrl);
}

// 匹配所有路径，但排除静态资源和API路由
export const config = {
  matcher: [
    // 匹配所有路径，但排除静态资源、API路由和特殊文件
    '/((?!api|_next/static|_next/image|favicon.ico|locales|ads.txt|robots.txt|sitemap.xml|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$).*)',
  ],
}; 