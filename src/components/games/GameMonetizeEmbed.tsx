'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { getGameEmbedCode } from '@/lib/gamemonetize';

interface GameMonetizeEmbedProps {
  gameUrl: string;
  title: string;
  locale: string;
  aspectRatio?: string; // 例如 '16/9' 或 '4/3'
}

export const GameMonetizeEmbed = ({
  gameUrl,
  title,
  locale,
  aspectRatio = '16/9',
}: GameMonetizeEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  
  // 多语言文本
  const translations = {
    loading: {
      en: 'Loading game...',
      zh: '游戏加载中...',
      es: 'Cargando juego...'
    },
    loadError: {
      en: 'Failed to load the game. Please try again later.',
      zh: '游戏加载失败，请稍后再试',
      es: 'Error al cargar el juego. Por favor, inténtelo de nuevo más tarde.'
    },
    retry: {
      en: 'Retry',
      zh: '重试',
      es: 'Reintentar'
    },
    loadingError: {
      en: 'Loading Error',
      zh: '加载错误',
      es: 'Error de carga'
    }
  };
  
  // 获取翻译文本
  const t = (key: keyof typeof translations) => {
    return translations[key][locale as keyof typeof translations[typeof key]] || translations[key]['en'];
  };
  
  // 计算宽高比
  const aspectRatioParts = aspectRatio.split('/');
  const aspectRatioValue = parseInt(aspectRatioParts[1]) / parseInt(aspectRatioParts[0]) * 100;
  
  // 处理iframe加载
  useEffect(() => {
    if (!iframeContainerRef.current) return;
    
    const handleLoad = () => {
      setIsLoading(false);
    };
    
    const handleError = () => {
      setIsLoading(false);
      setError(t('loadError'));
    };
    
    // 获取游戏嵌入代码
    const embedCode = getGameEmbedCode(gameUrl);
    
    // 创建iframe元素
    iframeContainerRef.current.innerHTML = embedCode;
    
    // 获取创建的iframe元素
    const iframe = iframeContainerRef.current.querySelector('iframe');
    
    if (iframe) {
      iframe.onload = handleLoad;
      iframe.onerror = handleError;
      
      // 设置iframe样式
      iframe.style.position = 'absolute';
      iframe.style.top = '0';
      iframe.style.left = '0';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
    }
    
    // 清理函数
    return () => {
      if (iframe) {
        iframe.onload = null;
        iframe.onerror = null;
      }
    };
  }, [gameUrl, t]);

  return (
    <div className="game-embed-container w-full">
      {/* 游戏容器 */}
      <div 
        className="relative w-full bg-gray-900 rounded-lg overflow-hidden"
        style={{ paddingBottom: `${aspectRatioValue}%` }}
      >
        {/* 加载状态 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-white">{t('loading')}</p>
            </div>
          </div>
        )}
        
        {/* 错误状态 */}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded max-w-md">
              <p className="font-medium">{t('loadingError')}</p>
              <p className="text-sm">{error}</p>
              <button 
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => window.location.reload()}
              >
                {t('retry')}
              </button>
            </div>
          </div>
        )}
        
        {/* iframe容器 */}
        <div 
          ref={iframeContainerRef} 
          className="absolute inset-0"
          aria-label={title}
        ></div>
      </div>
    </div>
  );
}; 