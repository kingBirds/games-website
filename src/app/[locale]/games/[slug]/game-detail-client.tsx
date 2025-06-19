'use client';

import { GameMonetizeGame } from '@/lib/gamemonetize';
import { GameMonetizeEmbed } from '@/components/games/GameMonetizeEmbed';
import { useState, useRef } from 'react';

interface GameDetailClientProps {
  game: GameMonetizeGame;
  locale: string;
  slug: string;
}

export default function GameDetailClient({ game, locale, slug }: GameDetailClientProps) {
  const [showGameEmbed, setShowGameEmbed] = useState(false);
  const gameEmbedRef = useRef<HTMLDivElement>(null);
  
  // 处理开始游戏按钮点击
  const handlePlayGame = () => {
    setShowGameEmbed(true);
    // 滚动到游戏嵌入区域
    setTimeout(() => {
      if (gameEmbedRef.current) {
        gameEmbedRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 游戏标题和分类 */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {game.title}
        </h1>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {game.category.map((category: string) => (
            <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm capitalize">
              {category}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4 mb-6">
          <button 
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
            onClick={handlePlayGame}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            {locale === 'zh' ? "开始游戏" : locale === 'es' ? "Jugar Ahora" : "Play Now"}
          </button>
          
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
            </svg>
            {locale === 'zh' ? "分享" : locale === 'es' ? "Compartir" : "Share"}
          </button>
          
          <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {locale === 'zh' ? "收藏" : locale === 'es' ? "Favorito" : "Favorite"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 游戏嵌入区域 - 占据更大空间 */}
        <div className="lg:col-span-3">
          {showGameEmbed ? (
            <div ref={gameEmbedRef} className="mb-8">
              <GameMonetizeEmbed
                gameUrl={game.gameUrl}
                title={game.title}
                locale={locale}
                aspectRatio="16/9"
              />
            </div>
          ) : (
            <div className="mb-8">
              <img
                src={game.thumbnail}
                alt={game.title}
                className="w-full h-64 lg:h-96 object-cover rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder-game.jpg';
                }}
              />
            </div>
          )}
          
          {/* 游戏描述 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {locale === 'zh' ? "游戏描述" : locale === 'es' ? "Descripción del Juego" : "Game Description"}
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-700 leading-relaxed mb-4">
                {game.description}
              </p>
              
              {game.instructions && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    {locale === 'zh' ? "游戏说明" : locale === 'es' ? "Instrucciones" : "Instructions"}
                  </h3>
                  <p className="text-gray-600">
                    {game.instructions}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 游戏信息侧边栏 */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-lg font-bold mb-4">
              {locale === 'zh' ? "游戏信息" : locale === 'es' ? "Información del Juego" : "Game Info"}
            </h3>
            
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">
                  {locale === 'zh' ? "开发商" : locale === 'es' ? "Desarrollador" : "Developer"}
                </span>
                <p className="font-medium">GameMonetize</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-500">
                  {locale === 'zh' ? "游戏尺寸" : locale === 'es' ? "Tamaño del Juego" : "Game Size"}
                </span>
                <p className="font-medium">{game.width} x {game.height}</p>
              </div>
              
              <div>
                <span className="text-sm text-gray-500">
                  {locale === 'zh' ? "标签" : locale === 'es' ? "Etiquetas" : "Tags"}
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {game.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs capitalize">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
