"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GAME_CATEGORIES, getCategoryName } from '@/lib/game-categories';
import { POPULARITY_OPTIONS, POPULARITY_LABELS, PopularityType } from '@/lib/gamemonetize';

interface MobileCategoryBarProps {
  locale: string;
  className?: string;
}

export const MobileCategoryBar = ({ locale, className = "" }: MobileCategoryBarProps) => {
  const pathname = usePathname();

  // 检查链接是否激活
  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // 热门分类（前4个）
  const popularCategories = Object.keys(POPULARITY_OPTIONS).slice(0, 4) as PopularityType[];
  
  // 主要游戏分类（前4个）
  const mainCategories = GAME_CATEGORIES.slice(0, 4);

  return (
    <div className={`md:hidden bg-white border-b border-gray-200 ${className}`}>
      <div className="container mx-auto px-4 py-3">
        {/* 热门分类 */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            {locale === 'zh' ? '热门排行' : locale === 'es' ? 'Popular' : 'Popular'}
          </h3>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {popularCategories.map((popularityType) => {
              const href = `/${locale}/popularity/${popularityType}`;
              const isActive = isActiveLink(href);
              const displayName = POPULARITY_LABELS[popularityType][locale as keyof typeof POPULARITY_LABELS[PopularityType]];

              return (
                <Link
                  key={popularityType}
                  href={href}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-sm transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {displayName}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 游戏分类 */}
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            {locale === 'zh' ? '游戏类型' : locale === 'es' ? 'Tipos de Juegos' : 'Game Types'}
          </h3>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {mainCategories.map((category) => {
              const href = `/${locale}/categories/${category.slug}`;
              const isActive = isActiveLink(href);
              const displayName = getCategoryName(category.id, locale);

              return (
                <Link
                  key={category.id}
                  href={href}
                  className={`flex-shrink-0 px-3 py-2 rounded-full text-sm transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {displayName}
                </Link>
              );
            })}
            
            {/* 查看全部链接 */}
            <Link
              href={`/${locale}/categories`}
              className="flex-shrink-0 px-3 py-2 rounded-full text-sm bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors"
            >
              {locale === 'zh' ? '全部' : locale === 'es' ? 'Todos' : 'All'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 