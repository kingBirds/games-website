import { sampleCategories } from '@/lib/sample-data';
import { sampleGames } from '@/lib/sample-data';
import { GameGrid } from '@/components/games/GameGrid';
import { notFound } from 'next/navigation';

interface CategoryDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  // 等待并获取 slug
  const { slug } = await params;
  
  const category = sampleCategories.find((c: any) => c.slug === slug);

  if (!category) {
    notFound();
  }

  // 通常这里会从用户会话或浏览器设置中获取语言
  const locale = 'zh'; // 默认中文

  // 获取该分类下的游戏
  const gamesInCategory = sampleGames.filter((game: any) => 
    game.categories.includes(category.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {typeof category.name === 'string' ? category.name : category.name[locale]}
        </h1>
        <p className="text-gray-600 max-w-3xl">
          {typeof category.description === 'string' ? category.description : category.description[locale]}
        </p>
      </div>
      
      {/* 游戏网格 */}
      <GameGrid 
        games={gamesInCategory} 
        locale={locale} 
        columns={4}
      />

      {/* 如果没有游戏 */}
      {gamesInCategory.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-2">此分类下暂无游戏</h2>
          <p className="text-gray-500">请稍后再来查看</p>
        </div>
      )}
    </div>
  );
} 