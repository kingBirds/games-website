"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
  locale: string;
}

export const GameCard = ({ game, locale }: GameCardProps) => {
  // 生成SEO友好的alt文本
  const generateAltText = () => {
    const gameTitle = game.title[locale] || game.title['en'] || 'Game';
    const categoryText = game.categories && game.categories.length > 0 
      ? ` - ${game.categories.join(', ')}` 
      : '';
    
    if (locale === 'zh') {
      return `${gameTitle}游戏截图${categoryText} - 免费在线游戏`;
    } else if (locale === 'es') {
      return `Captura de pantalla del juego ${gameTitle}${categoryText} - Juego gratuito en línea`;
    } else {
      return `${gameTitle} game screenshot${categoryText} - Free online game`;
    }
  };

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl sm:hover:transform sm:hover:scale-105">
      {/* 游戏缩略图 */}
      <div className="relative h-40 sm:h-48 w-full">
        <Image
          src={game.thumbnail || '/images/game-placeholder.jpg'}
          alt={generateAltText()}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/images/game-placeholder.jpg';
          }}
        />
        
        {/* 游戏标签 */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {game.isNew && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {locale === 'zh' ? '新游戏' : locale === 'es' ? 'Nuevo' : 'New'}
            </span>
          )}
          {game.isFeatured && (
            <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {locale === 'zh' ? '精选' : locale === 'es' ? 'Destacado' : 'Featured'}
            </span>
          )}
        </div>
      </div>
      
      {/* 游戏信息 */}
      <div className="p-4 text-white">
        <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-blue-300 transition-colors">
          <Link 
            href={`/${locale}/games/${game.id}`}
            className="hover:underline"
            title={game.title[locale] || game.title['en'] || 'Game'}
          >
            {game.title[locale] || game.title['en'] || 'Untitled Game'}
          </Link>
        </h3>
        
        {game.description && (
          <p className="text-gray-300 text-sm mb-3 line-clamp-2">
            {game.description[locale] || game.description['en'] || ''}
          </p>
        )}
        
        {/* 游戏分类 */}
        {game.categories && game.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {game.categories.slice(0, 2).map((cat: string) => (
              <span key={cat} className="bg-gray-700 text-xs px-2 py-1 rounded text-gray-300">
                {cat}
              </span>
            ))}
          </div>
        )}
        
        {/* 查看更多链接 */}
        <Link 
          href={`/${locale}/games/${game.id}`}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          title={`${locale === 'zh' ? '查看' : locale === 'es' ? 'Ver' : 'View'} ${game.title[locale] || game.title['en'] || 'game'}`}
        >
          {locale === 'zh' ? '查看更多' : locale === 'es' ? 'Ver más' : 'Read More'}
        </Link>
      </div>
    </div>
  );
}; 