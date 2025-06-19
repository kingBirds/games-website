"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GAME_CATEGORIES, getCategoryName } from '@/lib/game-categories';
import { POPULARITY_OPTIONS, POPULARITY_LABELS, PopularityType } from '@/lib/gamemonetize';

interface MobileCategoryBarProps {
  locale: string;
  className?: string;
  onCategorySelect?: () => void;
}

export const MobileCategoryBar = ({ locale, className = "", onCategorySelect }: MobileCategoryBarProps) => {
  const pathname = usePathname();

  // 检查链接是否激活
  const isActiveLink = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  // 处理分类点击
  const handleCategoryClick = () => {
    onCategorySelect?.();
  };

  // 热门分类（前6个）
  const popularCategories = Object.keys(POPULARITY_OPTIONS).slice(0, 6) as PopularityType[];
  
  // 主要游戏分类（前12个）
  const mainCategories = GAME_CATEGORIES.slice(0, 12);

  return (
    <div className={`md:hidden bg-white border-b border-gray-200 max-h-96 overflow-y-auto ${className}`}>
      <div className="container mx-auto px-4 py-3">
        {/* 热门分类 */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-3 sticky top-0 bg-white py-1">
            {locale === 'zh' ? '热门排行' : locale === 'es' ? 'Popular' : 'Popular'}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {popularCategories.map((popularityType) => {
              const href = `/${locale}/popularity/${popularityType}`;
              const isActive = isActiveLink(href);
              const displayName = POPULARITY_LABELS[popularityType][locale as keyof typeof POPULARITY_LABELS[PopularityType]];

              return (
                <Link
                  key={popularityType}
                  href={href}
                  onClick={handleCategoryClick}
                  className={`px-3 py-2 rounded-lg text-sm text-center transition-colors ${
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
          <h3 className="text-sm font-medium text-gray-600 mb-3 sticky top-0 bg-white py-1">
            {locale === 'zh' ? '游戏类型' : locale === 'es' ? 'Tipos de Juegos' : 'Game Types'}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {mainCategories.map((category) => {
              const href = `/${locale}/categories/${category.slug}`;
              const isActive = isActiveLink(href);
              const displayName = getCategoryName(category.id, locale);

              return (
                <Link
                  key={category.id}
                  href={href}
                  onClick={handleCategoryClick}
                  className={`px-3 py-2 rounded-lg text-sm text-center transition-colors ${
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
              onClick={handleCategoryClick}
              className="px-3 py-2 rounded-lg text-sm text-center bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors border-2 border-dashed border-gray-400"
            >
              {locale === 'zh' ? '查看全部' : locale === 'es' ? 'Ver todos' : 'View All'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 