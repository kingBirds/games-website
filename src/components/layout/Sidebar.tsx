"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { GAME_CATEGORIES, getCategoryName } from '@/lib/game-categories';
import { POPULARITY_OPTIONS, POPULARITY_LABELS, PopularityType } from '@/lib/gamemonetize';

interface SidebarProps {
  locale: string;
  className?: string;
  onCollapseChange?: (collapsed: boolean) => void;
}

export const Sidebar = ({ locale, className = "", onCollapseChange }: SidebarProps) => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    popularity: true
  });

  // 切换展开/折叠状态
  const toggleSection = (section: 'categories' | 'popularity') => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 切换侧边栏折叠状态
  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  // 检查链接是否激活
  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside className={`bg-gray-900 text-white transition-all duration-300 fixed top-0 left-0 h-screen z-10 ${isCollapsed ? 'w-16' : 'w-64'} ${className}`}>
      <div className="h-full flex flex-col">
        {/* 侧边栏头部 */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold">
                {locale === 'zh' ? '游戏分类' : 'Game Categories'}
              </h2>
            )}
            <button
              onClick={toggleCollapse}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* 侧边栏内容 */}
        <div className="flex-1 overflow-y-auto">
          {/* 热门分类 */}
          <div className="p-2">
            <div className="mb-2">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection('popularity')}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded transition-colors"
                >
                  <span className="font-medium text-sm text-gray-300">
                    {locale === 'zh' ? '热门排行' : 'Popular'}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${expandedSections.popularity ? 'rotate-90' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {(expandedSections.popularity || isCollapsed) && (
              <div className="space-y-1">
                {Object.keys(POPULARITY_OPTIONS).map((key) => {
                  const popularityType = key as PopularityType;
                  const href = `/${locale}/popularity/${key}`;
                  const isActive = isActiveLink(href);
                  const displayName = POPULARITY_LABELS[popularityType][locale as keyof typeof POPULARITY_LABELS[PopularityType]];

                  return (
                    <Link
                      key={key}
                      href={href}
                      className={`flex items-center p-2 rounded transition-colors group ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      }`}
                      title={isCollapsed ? displayName : undefined}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        isActive ? 'bg-white' : 'bg-gray-500 group-hover:bg-gray-300'
                      }`} />
                      {!isCollapsed && (
                        <span className="text-sm">{displayName}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* 主要游戏分类 */}
          <div className="p-2 border-t border-gray-700">
            <div className="mb-2">
              {!isCollapsed && (
                <button
                  onClick={() => toggleSection('categories')}
                  className="w-full flex items-center justify-between p-2 hover:bg-gray-700 rounded transition-colors"
                >
                  <span className="font-medium text-sm text-gray-300">
                    {locale === 'zh' ? '游戏类型' : 'Game Types'}
                  </span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 transition-transform ${expandedSections.categories ? 'rotate-90' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {(expandedSections.categories || isCollapsed) && (
              <div className="space-y-1">
                {GAME_CATEGORIES.map((category) => {
                  const href = `/${locale}/categories/${category.slug}`;
                  const isActive = isActiveLink(href);
                  const displayName = locale === 'zh' ? category.name.zh : category.name.en;

                  return (
                    <Link
                      key={category.id}
                      href={href}
                      className={`flex items-center p-2 rounded transition-colors group ${
                        isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      }`}
                      title={isCollapsed ? displayName : undefined}
                    >
                      <div className={`w-2 h-2 rounded-full mr-3 ${
                        isActive ? 'bg-white' : 'bg-gray-500 group-hover:bg-gray-300'
                      }`} />
                      {!isCollapsed && (
                        <span className="text-sm">{displayName}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 侧边栏底部 */}
        {!isCollapsed && (
          <div className="p-4 border-t border-gray-700">
            <div className="text-xs text-gray-400 text-center">
              {locale === 'zh' ? '免费在线游戏' : 'Free Online Games'}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}; 