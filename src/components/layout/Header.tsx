"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { locales } from '@/i18n';
import { getTranslations } from '@/utils/loadTranslations';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 从路径中提取当前语言
  const getCurrentLocale = () => {
    // 从路径中提取语言代码
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
        return locale;
      }
    }
    return 'en'; // 默认英文
  };
  
  const locale = getCurrentLocale();
  const t = getTranslations(locale);
  
  // 获取语言名称
  const getLanguageName = (lang: string) => {
    switch (lang) {
      case 'zh': return '中文';
      case 'es': return 'Español';
      case 'en': 
      default: return 'English';
    }
  };
  
  // 切换语言
  const changeLanguage = (newLocale: string) => {
    // 如果当前语言与新语言相同，不做任何操作
    if (locale === newLocale) return;
    
    // 在 App Router 中使用 router.push 导航到新的语言路径
    let newPath = pathname;
    
    // 替换当前语言为新语言
    for (const loc of locales) {
      if (pathname.startsWith(`/${loc}/`)) {
        newPath = pathname.replace(`/${loc}/`, `/${newLocale}/`);
        break;
      } else if (pathname === `/${loc}`) {
        newPath = `/${newLocale}`;
        break;
      }
    }
    
    // 如果路径没有变化，直接导航到新语言的首页
    if (newPath === pathname) {
      newPath = `/${newLocale}`;
    }
    
    console.log(`[Header] Changing language from ${locale} to ${newLocale}, new path: ${newPath}`);
    router.push(newPath);
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${locale}`} className="text-2xl font-bold ml-48">
          <span>FreeCasualGame</span>
        </Link>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center flex-1 justify-between">
          {/* 左侧：Home链接 */}
          <Link href={`/${locale}`} className="hover:text-blue-400 transition ml-10">
            {t.nav.home}
          </Link>
          
          {/* 中间：响应式搜索框 */}
          <div className="relative flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder={t.nav.search}
              className="bg-gray-800 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <button className="absolute right-3 top-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          
          {/* 右侧：语言切换 */}
          <div className="relative group">
            <button className="flex items-center hover:text-blue-400 transition">
              <span>{getLanguageName(locale)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              {locales.map((lang) => (
                <button 
                  key={lang}
                  onClick={() => changeLanguage(lang)} 
                  className={`block w-full text-left px-4 py-2 hover:bg-gray-700 ${locale === lang ? 'bg-gray-700' : ''}`}
                >
                  {getLanguageName(lang)}
                </button>
              ))}
            </div>
          </div>
        </nav>
        
        {/* 移动端搜索和菜单 */}
        <div className="md:hidden flex items-center space-x-3">
          {/* 移动端搜索按钮 */}
          <button 
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
          {/* 移动端菜单按钮 */}
          <button 
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 移动端导航菜单 */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2">
          <div className="flex flex-col space-y-3">
            <Link href={`/${locale}`} className="hover:text-blue-400 transition py-2">
              {t.nav.home}
            </Link>
            
            {/* 移动端搜索框 */}
            <div className="relative py-2">
              <input
                type="text"
                placeholder={t.nav.search}
                className="bg-gray-700 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-3 top-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
            
            {/* 移动端语言切换 */}
            <div className="py-2 flex flex-col space-y-1">
              <p className="text-gray-400">{t.nav.language}</p>
              {locales.map((lang) => (
                <button 
                  key={lang}
                  onClick={() => changeLanguage(lang)} 
                  className={`text-left py-1 ${locale === lang ? 'text-blue-400' : ''}`}
                >
                  {getLanguageName(lang)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}; 