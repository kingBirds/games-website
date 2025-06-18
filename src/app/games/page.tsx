import { sampleGames, sampleCategories } from '@/lib/sample-data';
import { GameGrid } from '@/components/games/GameGrid';
import Link from 'next/link';

export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams in Next.js 15
  const resolvedSearchParams = await searchParams;
  // 通常这里会从用户会话或浏览器设置中获取语言
  const locale = 'zh'; // 默认中文

  // 处理过滤条件
  const category = resolvedSearchParams.category as string | undefined;
  const featured = resolvedSearchParams.featured === 'true';
  const isNew = resolvedSearchParams.new === 'true';

  // 过滤游戏
  let filteredGames = [...sampleGames];
  
  if (category) {
    filteredGames = filteredGames.filter(game => game.categories.includes(category));
  }
  
  if (featured) {
    filteredGames = filteredGames.filter(game => game.isFeatured);
  }
  
  if (isNew) {
    filteredGames = filteredGames.filter(game => game.isNew);
  }

  // 获取页面标题
  let pageTitle = '所有游戏';
  if (category) {
    const categoryObj = sampleCategories.find(c => c.id === category);
    if (categoryObj) {
      pageTitle = categoryObj.name[locale] + '游戏';
    }
  } else if (featured) {
    pageTitle = '精选游戏';
  } else if (isNew) {
    pageTitle = '新游戏';
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">{pageTitle}</h1>

        {/* 分类过滤器 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href="/games"
            className={`px-4 py-2 rounded-full ${
              !category && !featured && !isNew
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 transition'
            }`}
          >
            全部
          </Link>
          <Link
            href="/games?featured=true"
            className={`px-4 py-2 rounded-full ${
              featured
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 transition'
            }`}
          >
            精选
          </Link>
          <Link
            href="/games?new=true"
            className={`px-4 py-2 rounded-full ${
              isNew
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 transition'
            }`}
          >
            新游戏
          </Link>
          {sampleCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/games?category=${cat.id}`}
              className={`px-4 py-2 rounded-full ${
                category === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 transition'
              }`}
            >
              {cat.name[locale]}
            </Link>
          ))}
        </div>
      </div>

      {/* 游戏网格 */}
      <GameGrid games={filteredGames} locale={locale} columns={4} />

      {/* 如果没有游戏 */}
      {filteredGames.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">没有找到游戏</h2>
          <p className="text-gray-600 mb-6">
            尝试使用其他过滤条件，或查看我们的所有游戏。
          </p>
          <Link
            href="/games"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            查看所有游戏
          </Link>
        </div>
      )}
    </main>
  );
} 