'use client';

import { sampleGames } from '@/lib/sample-data';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GameGrid } from '@/components/games/GameGrid';
import { GameEmbed } from '@/components/games/GameEmbed';
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function GameDetailPage() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string; // 这里的slug实际上是游戏的id
  
  const [game, setGame] = useState<any>(null);
  const [relatedGames, setRelatedGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGameEmbed, setShowGameEmbed] = useState(false);
  const gameEmbedRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // 验证请求的语言是否受支持
    if (!locales.includes(locale)) {
      notFound();
    }

    // 查找对应的游戏 - 使用id而不是slug
    const foundGame = sampleGames.find((g: any) => g.id === slug);
    
    // 如果找不到游戏，返回404
    if (!foundGame) {
      notFound();
    }
    
    setGame(foundGame);
    
    // 获取相关游戏（同类别的其他游戏）
    const related = sampleGames
      .filter((g: any) => g.id !== foundGame.id && g.categories.some((c: string) => foundGame.categories.includes(c)))
      .slice(0, 4);
    
    setRelatedGames(related);
    setLoading(false);
  }, [locale, slug]);
  
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
  
  if (loading || !game) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="aspect-video bg-gray-200 rounded w-full mb-6"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="h-40 bg-gray-200 rounded w-full mb-6"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 游戏信息 */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">
            {locale === 'zh' ? game.title.zh : game.title.en}
          </h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {game.categories.map((category: string) => (
              <span key={category} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {category}
              </span>
            ))}
          </div>
          
          <div className="relative aspect-video w-full mb-6 overflow-hidden rounded-lg">
            <Image 
              src={game.thumbnail} 
              alt={locale === 'zh' ? game.title.zh : game.title.en}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex gap-4 mb-8">
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
              onClick={handlePlayGame}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {locale === 'zh' ? "开始游戏" : "Play Now"}
            </button>
            
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              {locale === 'zh' ? "分享" : "Share"}
            </button>
            
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {locale === 'zh' ? "收藏" : "Favorite"}
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{locale === 'zh' ? "游戏描述" : "Description"}</h2>
            <p className="text-gray-700">
              {locale === 'zh' ? game.description.zh : game.description.en}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">{locale === 'zh' ? "游戏说明" : "Instructions"}</h2>
            <p className="text-gray-700">
              {locale === 'zh' ? game.instructions?.zh || "暂无游戏说明" : game.instructions?.en || "No instructions available"}
            </p>
          </div>
        </div>
        
        {/* 游戏嵌入和信息 */}
        <div>
          <div className="bg-gray-100 p-6 rounded-lg mb-6">
            <h3 className="text-xl font-bold mb-4">{locale === 'zh' ? "游戏信息" : "Game Info"}</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">{locale === 'zh' ? "开发者" : "Developer"}</span>
                <span>{game.developer || 'Unknown'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{locale === 'zh' ? "发布日期" : "Release Date"}</span>
                <span>{game.publishDate || 'Unknown'}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{locale === 'zh' ? "游玩次数" : "Play Count"}</span>
                <span>{game.playCount.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">{locale === 'zh' ? "适龄提示" : "Age Rating"}</span>
                <span>{game.minAge}+</span>
              </div>
            </div>
          </div>
          
          {/* 游戏嵌入 */}
          <div ref={gameEmbedRef} className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{locale === 'zh' ? "试玩游戏" : "Play Game"}</h3>
            {showGameEmbed ? (
              <GameEmbed 
                gameUrl={game.gameUrl}
                title={locale === 'zh' ? game.title.zh : game.title.en}
                locale={locale}
                aspectRatio="16/9"
                fullscreenEnabled={true}
              />
            ) : (
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <button 
                  onClick={handlePlayGame}
                  className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  {locale === 'zh' ? "点击加载游戏" : "Click to Load Game"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* 相关游戏 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{locale === 'zh' ? "相关游戏" : "Related Games"}</h2>
        <GameGrid games={relatedGames} locale={locale} />
      </div>
    </div>
  );
} 