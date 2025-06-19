import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { locales, defaultLocale } from './i18n';

// 简化的中间件，只处理国际化路由
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 如果是静态资源、特殊文件或API路由，直接返回
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api/') ||
      pathname.startsWith('/locales/') ||
      pathname === '/ads.txt' ||
      pathname === '/robots.txt' ||
      pathname === '/sitemap.xml' ||
      pathname.includes('.')) {
    return NextResponse.next();
  }

  // 创建 Supabase 客户端进行认证检查
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 获取用户信息
  const { data: { user } } = await supabase.auth.getUser();

  // 检查是否是受保护的管理员路由
  const isAdminRoute = pathname.includes('/admin');
  const isAuthRoute = pathname.includes('/login') || pathname.includes('/register');

  // 如果是管理员路由，需要检查权限
  if (isAdminRoute) {
    // 如果用户未登录，重定向到登录页
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      // 提取语言代码
      const localeMatch = pathname.match(/^\/([a-z]{2})\//);
      if (localeMatch) {
        loginUrl.pathname = `/${localeMatch[1]}/login`;
      } else {
        loginUrl.pathname = `/${defaultLocale}/login`;
      }
      return NextResponse.redirect(loginUrl);
    }

    // 检查用户是否是管理员
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (!profile || profile.role !== 'admin') {
      // 如果不是管理员，重定向到首页
      const homeUrl = new URL('/', request.url);
      const localeMatch = pathname.match(/^\/([a-z]{2})\//);
      if (localeMatch) {
        homeUrl.pathname = `/${localeMatch[1]}`;
      } else {
        homeUrl.pathname = `/${defaultLocale}`;
      }
      return NextResponse.redirect(homeUrl);
    }
  }

  // 如果已登录用户访问登录/注册页面，重定向到首页
  if (user && isAuthRoute) {
    const homeUrl = new URL('/', request.url);
    const localeMatch = pathname.match(/^\/([a-z]{2})\//);
    if (localeMatch) {
      homeUrl.pathname = `/${localeMatch[1]}`;
    } else {
      homeUrl.pathname = `/${defaultLocale}`;
    }
    return NextResponse.redirect(homeUrl);
  }

  // 处理国际化路由
  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // 如果路径已经包含语言前缀，返回supabaseResponse以保持认证状态
  if (pathnameHasLocale) {
    return supabaseResponse;
  }
  
  // 重定向到默认语言路径
  const redirectUrl = new URL(
    `/${defaultLocale}${pathname === '/' ? '' : pathname}`,
    request.url
  );
  
  // 为重定向响应复制cookie
  const redirectResponse = NextResponse.redirect(redirectUrl);
  supabaseResponse.cookies.getAll().forEach(({ name, value, ...options }) => {
    redirectResponse.cookies.set(name, value, options);
  });
  
  return redirectResponse;
}

// 匹配所有路径，但排除静态资源和API路由
export const config = {
  matcher: [
    // 匹配所有路径，但排除静态资源、API路由和特殊文件
    '/((?!api|_next/static|_next/image|favicon.ico|locales|ads.txt|robots.txt|sitemap.xml|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$).*)',
  ],
}; 