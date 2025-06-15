import { GameGrid } from '@/components/games/GameGrid';
import { sampleGames } from '@/lib/sample-data';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 获取 locale
  const { locale } = await params;
  
  // 验证请求的语言是否受支持
  if (!locales.includes(locale)) notFound();

  // 获取所有游戏
  const allGames = sampleGames;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {locale === 'zh' ? "所有游戏" : "All Games"}
      </h1>
      
      <div className="mb-8">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            {locale === 'zh' ? "全部" : "All"}
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            {locale === 'zh' ? "动作" : "Action"}
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            {locale === 'zh' ? "冒险" : "Adventure"}
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            {locale === 'zh' ? "益智" : "Puzzle"}
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            {locale === 'zh' ? "策略" : "Strategy"}
          </button>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder={locale === 'zh' ? "搜索游戏..." : "Search games..."}
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
      
      <GameGrid games={allGames} locale={locale} />
      
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          {locale === 'zh' ? "加载更多" : "Load More"}
        </button>
      </div>
    </div>
  );
} 