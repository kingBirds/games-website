import { notFound } from 'next/navigation';
import Link from 'next/link';
import { locales } from '@/i18n';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { GameSection } from '@/components/games/GameSection';
import { searchCachedGames } from '@/lib/data-cache';

interface SearchPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({
  params,
  searchParams
}: SearchPageProps) {
  const { locale } = await params;
  const { q: query } = await searchParams;
  
  // 验证语言
  if (!locales.includes(locale)) notFound();
  
  // 获取搜索查询
  const searchQuery = Array.isArray(query) ? query[0] : query;

  // 如果没有搜索查询，显示搜索表单
  if (!searchQuery) {
    return (
      <SidebarLayout locale={locale}>
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold mb-8">
            {locale === 'zh' ? '搜索游戏' : locale === 'es' ? 'Buscar Juegos' : 'Search Games'}
          </h1>
          
          <div className="max-w-xl mx-auto">
            <form action={`/${locale}/search`} method="GET" className="mb-12">
              <div className="relative">
                <input
                  type="text"
                  name="q"
                  placeholder={
                    locale === 'zh' 
                      ? "搜索游戏..." 
                      : locale === 'es' 
                      ? "Buscar juegos..." 
                      : "Search games..."
                  }
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {locale === 'zh' 
                  ? '输入关键词搜索游戏' 
                  : locale === 'es' 
                  ? 'Ingresa palabras clave para buscar juegos' 
                  : 'Enter keywords to search for games'
                }
              </p>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  {locale === 'zh' ? '热门搜索:' : locale === 'es' ? 'Búsquedas populares:' : 'Popular searches:'}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link 
                    href={`/${locale}/search?q=${locale === 'zh' ? '动作' : locale === 'es' ? 'acción' : 'action'}`} 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                  >
                    {locale === 'zh' ? '动作' : locale === 'es' ? 'Acción' : 'Action'}
                  </Link>
                  <Link 
                    href={`/${locale}/search?q=${locale === 'zh' ? '冒险' : locale === 'es' ? 'aventura' : 'adventure'}`} 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                  >
                    {locale === 'zh' ? '冒险' : locale === 'es' ? 'Aventura' : 'Adventure'}
                  </Link>
                  <Link 
                    href={`/${locale}/search?q=${locale === 'zh' ? '益智' : locale === 'es' ? 'puzzle' : 'puzzle'}`} 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                  >
                    {locale === 'zh' ? '益智' : locale === 'es' ? 'Puzzle' : 'Puzzle'}
                  </Link>
                  <Link 
                    href={`/${locale}/search?q=${locale === 'zh' ? '赛车' : locale === 'es' ? 'carreras' : 'racing'}`} 
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition"
                  >
                    {locale === 'zh' ? '赛车' : locale === 'es' ? 'Carreras' : 'Racing'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    );
  }

  // 搜索游戏
  const searchResults = await searchCachedGames(searchQuery, 50);

  return (
    <SidebarLayout locale={locale}>
      <div className="container mx-auto px-4 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {locale === 'zh' 
              ? `搜索结果: "${searchQuery}"` 
              : locale === 'es' 
              ? `Resultados de búsqueda: "${searchQuery}"` 
              : `Search Results: "${searchQuery}"`
            }
          </h1>
          <p className="text-gray-600">
            {locale === 'zh' 
              ? `找到 ${searchResults.length} 个结果` 
              : locale === 'es' 
              ? `Se encontraron ${searchResults.length} resultados` 
              : `Found ${searchResults.length} results`
            }
          </p>
          
          {/* 搜索表单 */}
          <form action={`/${locale}/search`} method="GET" className="mt-6 mb-8 max-w-xl">
            <div className="relative">
              <input
                type="text"
                name="q"
                defaultValue={searchQuery}
                placeholder={
                  locale === 'zh' 
                    ? "搜索游戏..." 
                    : locale === 'es' 
                    ? "Buscar juegos..." 
                    : "Search games..."
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0z" />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* 搜索结果 */}
        {searchResults.length > 0 ? (
          <GameSection
            title=""
            games={searchResults}
            locale={locale}
            className="py-0"
          />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">
              {locale === 'zh' 
                ? '没有找到相关游戏' 
                : locale === 'es' 
                ? 'No se encontraron juegos relacionados' 
                : 'No related games found'
              }
            </h2>
            <p className="text-gray-600 mb-6">
              {locale === 'zh' 
                ? '尝试使用其他关键词，或查看我们的所有游戏。' 
                : locale === 'es' 
                ? 'Intenta usar otras palabras clave, o mira todos nuestros juegos.' 
                : 'Try using different keywords, or check out all our games.'
              }
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={`/${locale}/games`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
              >
                {locale === 'zh' 
                  ? '浏览所有游戏' 
                  : locale === 'es' 
                  ? 'Ver todos los juegos' 
                  : 'Browse all games'
                }
              </Link>
              <Link
                href={`/${locale}/search`}
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
              >
                {locale === 'zh' 
                  ? '重新搜索' 
                  : locale === 'es' 
                  ? 'Buscar de nuevo' 
                  : 'Search again'
                }
              </Link>
            </div>
          </div>
        )}
        
        {/* 返回首页链接 */}
        <div className="text-center mt-8">
          <Link
            href={`/${locale}`}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            {locale === 'zh' 
              ? '← 返回首页' 
              : locale === 'es' 
              ? '← Volver al Inicio' 
              : '← Back to Home'
            }
          </Link>
        </div>
      </div>
    </SidebarLayout>
  );
} 