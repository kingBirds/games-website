"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Game } from '@/types/game';

interface GameCardProps {
  game: Game;
  locale: string;
}

export const GameCard = ({ game, locale }: GameCardProps) => {
  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl sm:hover:transform sm:hover:scale-105">
      {/* 游戏缩略图 */}
      <div className="relative h-40 sm:h-48 w-full">
        {/* 如果有实际图片，使用下面的代码 */}
        <Image
          src={game.thumbnail || '/images/game-placeholder.jpg'}
          alt={game.title[locale] || 'Game'}
          fill
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* 游戏标签 */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {game.isNew && (
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {locale === 'zh' ? '新游戏' : 'New'}
            </span>
          )}
          {game.isFeatured && (
            <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {locale === 'zh' ? '精选' : 'Featured'}
            </span>
          )}
        </div>
      </div>
      
      {/* 游戏信息 */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-white mb-1 truncate">
          {game.title[locale] || game.title['en'] || (locale === 'zh' ? '游戏标题' : 'Game Title')}
        </h3>
        
        <div className="flex items-center text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
          <div className="flex items-center mr-4">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{game.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{game.playCount.toLocaleString()}{locale === 'zh' ? '次游玩' : ' plays'}</span>
          </div>
        </div>
        
        {/* 游戏分类标签 */}
        <div className="flex flex-wrap gap-1 mb-2 sm:mb-4">
          {game.categories.slice(0, 2).map((category, index) => (
            <Link
              key={index}
              href={`/${locale}/categories/${category}`}
              className="bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded transition"
            >
              {category}
            </Link>
          ))}
        </div>
        
        {/* 游戏描述 */}
        <div className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 relative">
          <div className="line-clamp-2 overflow-hidden">
            {game.description[locale] || game.description['en'] || (locale === 'zh' ? '暂无描述。' : 'No description available.')}
          </div>
          <div className="text-right mt-1 hidden sm:block">
            <Link
              href={`/${locale}/games/${game.id}`}
              className="text-blue-500 hover:text-blue-600 text-xs"
            >
              {locale === 'zh' ? '查看更多' : 'Read More'}
            </Link>
          </div>
        </div>
        
        {/* 开始游戏按钮 */}
        <Link
          href={`/${locale}/games/${game.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-2 rounded transition text-sm sm:text-base"
        >
          {locale === 'zh' ? '开始游戏' : 'Play Game'}
        </Link>
      </div>
    </div>
  );
}; 