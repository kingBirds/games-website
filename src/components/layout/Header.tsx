"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { locales } from '@/i18n';
import { getTranslations } from '@/utils/loadTranslations';
import { useMobileCategoryBar } from '@/hooks/useMobileCategoryBar';
import { UserMenu } from './user-menu';


export const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  
  // 使用移动端分类导航条状态管理
  const { isCategoryBarOpen, toggleCategoryBar } = useMobileCategoryBar();
  
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

  // 获取简短语言显示名称
  const getShortLanguageName = (lang: string) => {
    switch (lang) {
      case 'zh': return '中文';
      case 'es': return 'ES';
      case 'en': 
      default: return 'EN';
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

  // 处理搜索提交
  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
      setIsSearchOpen(false); // 关闭搜索框
      setMobileSearchQuery(''); // 清空搜索框
    }
  };

  // 处理桌面搜索框提交
  const handleDesktopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  // 处理移动端搜索框提交
  const handleMobileSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(mobileSearchQuery);
  };

  // 处理键盘事件
  const handleKeyPress = (e: React.KeyboardEvent, query: string) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  // 切换搜索框显示状态
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsLanguageMenuOpen(false); // 关闭语言菜单
    }
  };

  // 处理分类按钮点击
  const handleCategoryToggle = () => {
    toggleCategoryBar();
    setIsSearchOpen(false); // 关闭搜索框
    setIsLanguageMenuOpen(false); // 关闭语言菜单
  };

  // 处理语言菜单切换
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
    setIsSearchOpen(false); // 关闭搜索框
  };

  // 处理语言选择
  const handleLanguageSelect = (lang: string) => {
    changeLanguage(lang);
    setIsLanguageMenuOpen(false);
  };

  return (
    <header className="bg-gray-900 text-white">
      {/* 桌面端Header */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="text-xl sm:text-2xl font-bold">
            <span className="hidden sm:inline">FreeCasualGame</span>
            <span className="sm:hidden">FCG</span>
          </Link>

          {/* 桌面导航 */}
          <nav className="flex items-center flex-1 justify-between">
            {/* 左侧：Home链接 */}
            <Link href={`/${locale}`} className="hover:text-blue-400 transition ml-10">
              {t.nav.home}
            </Link>
            
            {/* 中间：响应式搜索框 */}
            <form onSubmit={handleDesktopSearchSubmit} className="relative flex-1 max-w-md mx-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, searchQuery)}
                placeholder={t.nav.search}
                className="bg-gray-800 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                type="submit"
                className="absolute right-3 top-2 hover:text-blue-400 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0z" />
                </svg>
              </button>
            </form>
            
            {/* 右侧：用户菜单和语言切换 */}
            <div className="flex items-center space-x-4">
              {/* 用户菜单 */}
              <UserMenu locale={locale} />
              
              {/* 语言切换 */}
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
            </div>
          </nav>
        </div>
      </div>

      {/* 移动端Header */}
      <div className="md:hidden">
        {/* 顶部栏：Logo + 按钮组 */}
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold hover:text-blue-400 transition">
            FreeCasualGame
          </Link>
          
          <div className="flex items-center space-x-2">
            {/* 分类按钮 */}
            <button 
              className={`text-white p-2 hover:bg-gray-700 rounded transition ${isCategoryBarOpen ? 'bg-blue-600' : ''}`}
              onClick={handleCategoryToggle}
              aria-label="Categories"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
              </svg>
            </button>
            
            {/* 搜索图标 */}
            <button 
              className={`text-white p-2 hover:bg-gray-700 rounded transition ${isSearchOpen ? 'bg-blue-600' : ''}`}
              onClick={toggleSearch}
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0z" />
              </svg>
            </button>
            
            {/* 用户菜单 - 移动端 */}
            <div className="relative">
              <UserMenu locale={locale} />
            </div>
            
            {/* 语言按钮 */}
            <button 
              className={`text-white px-3 py-2 hover:bg-gray-700 rounded transition text-sm font-medium ${isLanguageMenuOpen ? 'bg-blue-600' : ''}`}
              onClick={toggleLanguageMenu}
              aria-label="Language"
            >
              {getShortLanguageName(locale)}
            </button>
          </div>
        </div>

        {/* 弹出式搜索框 */}
        {isSearchOpen && (
          <div className="container mx-auto px-4 pb-3 border-t border-gray-700 bg-gray-800">
            <div className="pt-3">
              <form onSubmit={handleMobileSearchSubmit} className="relative">
                <input
                  type="text"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onKeyPress={(e) => handleKeyPress(e, mobileSearchQuery)}
                  placeholder={t.nav.search}
                  className="bg-gray-700 text-white px-4 py-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-blue-400 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0z" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 移动端语言切换菜单 */}
        {isLanguageMenuOpen && (
          <div className="container mx-auto px-4 pb-3 border-t border-gray-700 bg-gray-800">
            <div className="pt-3">
              <p className="text-gray-400 mb-3 font-medium text-sm">{t.nav.language || 'Language'}</p>
              <div className="grid grid-cols-3 gap-2">
                {locales.map((lang) => (
                  <button 
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)} 
                    className={`text-center py-2 px-3 rounded-lg transition ${
                      locale === lang 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    }`}
                  >
                    {getLanguageName(lang)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}; 