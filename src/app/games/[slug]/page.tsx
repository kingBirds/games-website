import { sampleGames } from '@/lib/sample-data';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface GameDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GameDetailPage({ params }: GameDetailPageProps) {
  // 等待并获取 slug
  const { slug } = await params;
  
  const game = sampleGames.find((g: any) => g.id === slug);

  if (!game) {
    notFound();
  }

  // 通常这里会从用户会话或浏览器设置中获取语言
  const locale = 'zh'; // 默认中文

  // 获取相关游戏（同类别的其他游戏）
  const relatedGames = sampleGames
    .filter((g) => g.id !== game.id && g.categories.some((c) => game.categories.includes(c)))
    .slice(0, 4);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* 游戏标题和基本信息 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{game.title[locale]}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {game.categories.map((category, index) => (
            <Link
              key={index}
              href={`/categories/${category}`}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded hover:bg-blue-200 transition"
            >
              {category}
            </Link>
          ))}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{game.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{game.playCount.toLocaleString()}次游玩</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>适合{game.minAge}岁以上</span>
          </div>
        </div>
      </div>

      {/* 游戏内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 游戏和描述 */}
        <div className="lg:col-span-2">
          {/* 游戏iframe */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6 aspect-video">
            <iframe
              src={game.gameUrl}
              title={game.title[locale]}
              className="w-full h-full border-0"
              allowFullScreen
            ></iframe>
          </div>

          {/* 游戏描述 */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">游戏介绍</h2>
            <p className="text-gray-700 mb-4">{game.description[locale]}</p>
            
            {/* 游戏标签 */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">标签:</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 游戏说明 */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">游戏说明:</h3>
              <p className="text-gray-700">{game.instructions[locale]}</p>
            </div>
          </div>
        </div>

        {/* 侧边栏 */}
        <div className="space-y-6">
          {/* 游戏缩略图 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={game.thumbnail || '/images/game-placeholder.jpg'}
                alt={game.title[locale]}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="p-4">
              <a
                href={game.gameUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition"
              >
                全屏游戏
              </a>
            </div>
          </div>

          {/* 游戏信息 */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">游戏信息</h2>
            <div className="space-y-3">
              <div>
                <span className="text-gray-500">开发者:</span>
                <span className="ml-2">{game.developer}</span>
              </div>
              <div>
                <span className="text-gray-500">发布日期:</span>
                <span className="ml-2">{new Date(game.publishDate).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="text-gray-500">分类:</span>
                <span className="ml-2">{game.categories.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 相关游戏 */}
      {relatedGames.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">相关游戏</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedGames.map((relatedGame) => (
              <Link href={`/games/${relatedGame.id}`} key={relatedGame.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
                  <div className="relative h-40 w-full">
                    <Image
                      src={relatedGame.thumbnail || '/images/game-placeholder.jpg'}
                      alt={relatedGame.title[locale]}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-1 truncate">{relatedGame.title[locale]}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{relatedGame.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
