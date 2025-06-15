'use client';

import { sampleGames } from '@/lib/sample-data';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { GameGrid } from '@/components/games/GameGrid';
import Image from 'next/image';
import { useContentTranslations } from '@/utils/loadContentTranslations';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getTranslations } from '@/utils/loadTranslations';

// 示例分类数据 - 仅用于图片和ID映射
const categories = [
  {
    id: 'action',
    slug: 'action',
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'adventure',
    slug: 'adventure',
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1536751048178-14e15b3fac95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'puzzle',
    slug: 'puzzle',
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'strategy',
    slug: 'strategy',
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'sports',
    slug: 'sports',
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'racing',
    slug: 'racing',
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
];

export default function CategoryDetailPage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;
  
  // 获取UI翻译
  const uiTranslations = getTranslations(locale);
  
  // 获取内容翻译
  const { translations: contentTranslations, isLoading, error } = useContentTranslations(locale);
  
  // 状态管理
  const [categoryGames, setCategoryGames] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<typeof categories[0] | undefined>(undefined);
  
  // 验证请求的语言是否受支持
  useEffect(() => {
    if (!locales.includes(locale)) {
      notFound();
    }
  }, [locale]);
  
  // 查找对应的分类
  useEffect(() => {
    const foundCategory = categories.find((c) => c.slug === slug);
    setCategoryData(foundCategory);
    
    // 如果找不到分类，返回404
    if (!foundCategory) {
      notFound();
    }
    
    // 获取该分类下的游戏
    const filteredGames = sampleGames.filter((game: any) => 
      game.categories.includes(foundCategory.id)
    );
    setCategoryGames(filteredGames);
  }, [slug]);
  
  // 获取分类内容
  const categoryContent = contentTranslations?.categories?.[slug];

  // 加载状态
  if (isLoading || !categoryData) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">
          <div className="h-64 w-full bg-gray-300 rounded-lg mb-8"></div>
          <div className="h-8 w-64 bg-gray-300 rounded mx-auto mb-4"></div>
          <div className="h-4 w-full max-w-3xl bg-gray-300 rounded mx-auto"></div>
        </div>
      </div>
    );
  }
  
  // 错误状态
  if (error || !categoryContent) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          {locale === 'zh' ? "加载分类信息时出错" : "Error loading category information"}
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 分类头部 */}
      <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
        {categoryData.featuredImage ? (
          <Image
            src={categoryData.featuredImage}
            alt={categoryContent.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-blue-600 flex items-center justify-center">
            <Image
              src={categoryData.icon}
              alt={categoryContent.title}
              width={64}
              height={64}
              className="opacity-75"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            {categoryContent.title}
          </h1>
        </div>
      </div>
      
      {/* 分类描述 */}
      <div className="mb-8 text-center max-w-3xl mx-auto">
        <p className="text-lg text-gray-700">
          {categoryContent.description}
        </p>
      </div>
      
      {/* 筛选和排序 */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-gray-700 mr-2">{locale === 'zh' ? "排序:" : "Sort by:"}</span>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>{locale === 'zh' ? "热门" : "Popular"}</option>
              <option>{locale === 'zh' ? "最新" : "Newest"}</option>
              <option>{locale === 'zh' ? "评分" : "Rating"}</option>
            </select>
          </div>
          
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder={uiTranslations.nav.search}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* 游戏列表 */}
      <GameGrid games={categoryGames} locale={locale} />
      
      {/* 加载更多按钮 */}
      {categoryGames.length > 12 && (
        <div className="flex justify-center mt-8">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            {locale === 'zh' ? "加载更多" : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
} 