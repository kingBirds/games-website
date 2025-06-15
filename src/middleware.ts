import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale } from './i18n';
import { createServerClient } from '@supabase/ssr';

// 您提供的Supabase URL
const supabaseUrl = 'https://lysweuannqyqmwskylsu.supabase.co';

// 简单的中间件，只处理根路径重定向
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // 如果是静态资源，直接返回
  if (pathname.startsWith('/locales/')) {
    return NextResponse.next();
  }
  
  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // 创建supabase响应对象
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 创建supabase服务器客户端
  const supabase = createServerClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
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

  // 获取当前用户
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 如果路径已经包含语言前缀，直接返回
  if (pathnameHasLocale) {
    return supabaseResponse;
  }
  
  // 重定向到默认语言路径
  const redirectUrl = new URL(
    `/${defaultLocale}${pathname === '/' ? '' : pathname}`,
    request.url
  );
  
  // 创建重定向响应
  const redirectResponse = NextResponse.redirect(redirectUrl);
  
  // 复制所有cookies到重定向响应
  supabaseResponse.cookies.getAll().forEach(cookie => {
    redirectResponse.cookies.set(cookie.name, cookie.value);
  });
  
  return redirectResponse;
}

// 匹配所有路径，但排除静态资源和API路由
export const config = {
  matcher: [
    // 匹配所有路径，但排除静态资源、API路由和locales目录
    '/((?!api|_next/static|_next/image|favicon.ico|locales|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$).*)',
  ],
}; 