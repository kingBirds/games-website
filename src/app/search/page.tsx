import { sampleGames } from '@/lib/sample-data';
import { GameGrid } from '@/components/games/GameGrid';
import Link from 'next/link';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;
  // 获取搜索查询
  const query = resolvedSearchParams.q as string | undefined;
  
  // 通常这里会从用户会话或浏览器设置中获取语言
  const locale = 'zh'; // 默认中文

  // 如果没有搜索查询，显示空页面
  if (!query) {
    return (
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">搜索游戏</h1>
        <div className="max-w-xl mx-auto">
          <form action="/search" method="GET" className="mb-12">
            <div className="relative">
              <input
                type="text"
                name="q"
                placeholder="搜索游戏..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>
          
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">输入关键词搜索游戏</p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">热门搜索:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link href="/search?q=动作" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                  动作
                </Link>
                <Link href="/search?q=冒险" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                  冒险
                </Link>
                <Link href="/search?q=益智" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                  益智
                </Link>
                <Link href="/search?q=赛车" className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition">
                  赛车
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 搜索游戏
  // 在实际应用中，这里可能会调用API或使用更复杂的搜索算法
  const searchResults = sampleGames.filter((game) => {
    const titleMatch = game.title[locale]?.toLowerCase().includes(query.toLowerCase());
    const descMatch = game.description[locale]?.toLowerCase().includes(query.toLowerCase());
    const tagMatch = game.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    const categoryMatch = game.categories.some(cat => cat.toLowerCase().includes(query.toLowerCase()));
    
    return titleMatch || descMatch || tagMatch || categoryMatch;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">搜索结果: &ldquo;{query}&rdquo;</h1>
        <p className="text-gray-600">找到 {searchResults.length} 个结果</p>
        
        {/* 搜索表单 */}
        <form action="/search" method="GET" className="mt-6 mb-8 max-w-xl">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="搜索游戏..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* 搜索结果 */}
      {searchResults.length > 0 ? (
        <GameGrid games={searchResults} locale={locale} columns={4} />
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">没有找到相关游戏</h2>
          <p className="text-gray-600 mb-6">
            尝试使用其他关键词，或查看我们的所有游戏。
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/games"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              浏览所有游戏
            </Link>
            <Link
              href="/search"
              className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-lg transition"
            >
              重新搜索
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
