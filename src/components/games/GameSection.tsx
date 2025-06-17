import Link from 'next/link';
import { GameGrid } from './GameGrid';
import { GameMonetizeGame } from '@/lib/gamemonetize';

interface GameSectionProps {
  title: string;
  games: GameMonetizeGame[];
  locale: string;
  moreLink?: string;
  className?: string;
}

export const GameSection = ({ 
  title, 
  games, 
  locale, 
  moreLink,
  className = ""
}: GameSectionProps) => {
  // 转换GameMonetize游戏为内部格式
  const convertedGames = games.map(game => ({
    id: game.id,
    title: {
      [locale]: game.title,
      en: game.title
    },
    description: {
      [locale]: game.description,
      en: game.description
    },
    thumbnail: game.thumbnail,
    gameUrl: game.gameUrl,
    categories: game.category,
    tags: game.tags,
    rating: 4.5,
    playCount: Math.floor(Math.random() * 50000) + 1000,
    isNew: false,
    isFeatured: false,
    developer: 'GameMonetize',
    publishDate: new Date().toISOString().split('T')[0],
    instructions: {
      [locale]: game.instructions,
      en: game.instructions
    },
    minAge: 8
  }));

  return (
    <section className={`py-0 ${className}`}>
      <div className="py-1">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-3xl font-bold">
            {title}
          </h2>
          {moreLink && (
            <Link 
              href={moreLink}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              {locale === 'zh' ? '查看更多' : 'View More'}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          )}
        </div>
        
        {games.length > 0 ? (
          <GameGrid games={convertedGames} locale={locale} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {locale === 'zh' ? '暂无游戏数据' : 'No games available'}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}; 