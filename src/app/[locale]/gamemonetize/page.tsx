'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { GameGrid } from '@/components/games/GameGrid';
import Link from 'next/link';

// 定义翻译类型
type SupportedLocale = 'en' | 'zh' | 'es';
type CategoryKey = 'action' | 'adventure' | 'puzzle' | 'racing' | 'sports' | 'strategy';

// 定义翻译对象类型
interface Translations {
  title: Record<SupportedLocale, string>;
  subtitle: Record<SupportedLocale, string>;
  loading: Record<SupportedLocale, string>;
  error: Record<SupportedLocale, string>;
  retry: Record<SupportedLocale, string>;
  allCategories: Record<SupportedLocale, string>;
  categories: {
    action: Record<SupportedLocale, string>;
    adventure: Record<SupportedLocale, string>;
    puzzle: Record<SupportedLocale, string>;
    racing: Record<SupportedLocale, string>;
    sports: Record<SupportedLocale, string>;
    strategy: Record<SupportedLocale, string>;
  };
  nextPage: Record<SupportedLocale, string>;
  prevPage: Record<SupportedLocale, string>;
  page: Record<SupportedLocale, string>;
  of: Record<SupportedLocale, string>;
}

export default function GameMonetizePage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const currentLocale = (locales.includes(locale) ? locale : 'en') as SupportedLocale;
  
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // 多语言文本
  const translations: Translations = {
    title: {
      en: 'GameMonetize Games',
      zh: 'GameMonetize 游戏',
      es: 'Juegos de GameMonetize'
    },
    subtitle: {
      en: 'Play the best HTML5 games from GameMonetize',
      zh: '畅玩来自GameMonetize的最佳HTML5游戏',
      es: 'Juega los mejores juegos HTML5 de GameMonetize'
    },
    loading: {
      en: 'Loading games...',
      zh: '游戏加载中...',
      es: 'Cargando juegos...'
    },
    error: {
      en: 'Failed to load games. Please try again later.',
      zh: '游戏加载失败，请稍后再试。',
      es: 'Error al cargar los juegos. Por favor, inténtelo de nuevo más tarde.'
    },
    retry: {
      en: 'Retry',
      zh: '重试',
      es: 'Reintentar'
    },
    allCategories: {
      en: 'All Categories',
      zh: '所有分类',
      es: 'Todas las categorías'
    },
    categories: {
      action: { en: 'Action', zh: '动作', es: 'Acción' },
      adventure: { en: 'Adventure', zh: '冒险', es: 'Aventura' },
      puzzle: { en: 'Puzzle', zh: '益智', es: 'Rompecabezas' },
      racing: { en: 'Racing', zh: '赛车', es: 'Carreras' },
      sports: { en: 'Sports', zh: '体育', es: 'Deportes' },
      strategy: { en: 'Strategy', zh: '策略', es: 'Estrategia' }
    },
    nextPage: {
      en: 'Next Page',
      zh: '下一页',
      es: 'Página siguiente'
    },
    prevPage: {
      en: 'Previous Page',
      zh: '上一页',
      es: 'Página anterior'
    },
    page: {
      en: 'Page',
      zh: '页',
      es: 'Página'
    },
    of: {
      en: 'of',
      zh: '/',
      es: 'de'
    }
  };
  
  // 获取普通翻译文本
  const getText = (key: keyof Omit<Translations, 'categories'>): string => {
    return translations[key][currentLocale] || translations[key]['en'];
  };
  
  // 获取分类翻译文本
  const getCategoryText = (categoryKey: CategoryKey): string => {
    return translations.categories[categoryKey][currentLocale] || 
           translations.categories[categoryKey]['en'];
  };
  
  // 获取GameMonetize游戏
  const fetchGames = async (page = 1, category: string | null = null) => {
    setLoading(true);
    setError(null);
    
    try {
      // 构建API请求URL
      let url = `/api/gamemonetize?locale=${locale}&page=${page}&limit=12`;
      if (category) {
        url += `&category=${category}`;
      }
      
      // 发送请求
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Unknown error');
      }
      
      setGames(data.games);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch games:', err);
      setError(getText('error'));
    } finally {
      setLoading(false);
    }
  };
  
  // 处理分类变化
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchGames(1, category);
  };
  
  // 处理页面变化
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    setCurrentPage(page);
    fetchGames(page, selectedCategory);
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 初始加载
  useEffect(() => {
    // 验证请求的语言是否受支持
    if (!locales.includes(locale)) {
      notFound();
    }
    
    fetchGames();
  }, [locale]);
  
  // 分类列表 - 使用GameMonetize API的实际分类
  const categories = [
    { id: 'Action', name: getCategoryText('action') },
    { id: 'Adventure', name: getCategoryText('adventure') },
    { id: 'Arcade', name: 'Arcade' },
    { id: 'Clicker', name: 'Clicker' },
    { id: 'Hypercasual', name: 'Hypercasual' },
    { id: 'Puzzles', name: getCategoryText('puzzle') },
    { id: 'Racing', name: getCategoryText('racing') },
    { id: 'Shooting', name: 'Shooting' },
    { id: 'Sports', name: getCategoryText('sports') },
    { id: 'Strategy', name: getCategoryText('strategy') }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{getText('title')}</h1>
        <p className="text-xl text-gray-600">{getText('subtitle')}</p>
      </div>
      
      {/* 分类筛选 */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          className={`px-4 py-2 rounded-full ${
            selectedCategory === null
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => handleCategoryChange(null)}
        >
          {getText('allCategories')}
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* 加载状态 */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">{getText('loading')}</p>
          </div>
        </div>
      )}
      
      {/* 错误状态 */}
      {error && (
        <div className="flex justify-center items-center py-12">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded max-w-md text-center">
            <p className="font-medium mb-2">{error}</p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => fetchGames(currentPage, selectedCategory)}
            >
              {getText('retry')}
            </button>
          </div>
        </div>
      )}
      
      {/* 游戏列表 */}
      {!loading && !error && games.length > 0 && (
        <GameGrid games={games} locale={locale} />
      )}
      
      {/* 分页 */}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2">
          <button
            className={`px-4 py-2 rounded ${
              currentPage === 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {getText('prevPage')}
          </button>
          
          <span className="px-4 py-2">
            {getText('page')} {currentPage} {getText('of')} {totalPages}
          </span>
          
          <button
            className={`px-4 py-2 rounded ${
              currentPage === totalPages
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {getText('nextPage')}
          </button>
        </div>
      )}
      
      {/* 没有游戏 */}
      {!loading && !error && games.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">暂无游戏</p>
        </div>
      )}
    </div>
  );
} 