import { GameCard } from './GameCard';
import { Game } from '@/types/game';

interface GameGridProps {
  games: Game[];
  title?: string;
  viewAllLink?: string;
  viewAllText?: string;
  locale: string;
  columns?: 2 | 3 | 4 | 5;
}

export const GameGrid = ({
  games,
  title,
  viewAllLink,
  viewAllText = '查看全部',
  locale,
  columns = 4,
}: GameGridProps) => {
  // 根据columns设置网格列数
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
  };

  return (
    <div className="py-2">
      {/* 标题和查看全部链接 */}
      {(title || viewAllLink) && (
        <div className="flex justify-between items-center mb-6">
          {title && <h2 className="text-2xl font-bold">{title}</h2>}
          {viewAllLink && (
            <a
              href={viewAllLink}
              className="text-blue-500 hover:text-blue-600 font-medium flex items-center"
            >
              {viewAllText}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          )}
        </div>
      )}

      {/* 游戏网格 */}
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {games.map((game) => (
          <GameCard key={game.id} game={game} locale={locale} />
        ))}
      </div>

      {/* 如果没有游戏 */}
      {games.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">暂无游戏</p>
        </div>
      )}
    </div>
  );
}; 