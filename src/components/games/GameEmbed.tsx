'use client';

import { useState, useEffect, useRef } from 'react';

interface GameEmbedProps {
  gameUrl: string;
  title: string;
  locale: string;
  aspectRatio?: string; // 例如 '16/9' 或 '4/3'
  fullscreenEnabled?: boolean;
}

export const GameEmbed = ({
  gameUrl,
  title,
  locale,
  aspectRatio = '16/9',
  fullscreenEnabled = true,
}: GameEmbedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
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
    fullscreenError: {
      en: 'Unable to enter fullscreen mode',
      zh: '无法进入全屏模式',
      es: 'No se puede entrar en modo pantalla completa'
    },
    retry: {
      en: 'Retry',
      zh: '重试',
      es: 'Reintentar'
    },
    fullscreen: {
      en: 'Fullscreen',
      zh: '全屏模式',
      es: 'Pantalla completa'
    },
    exitFullscreen: {
      en: 'Exit Fullscreen',
      zh: '退出全屏',
      es: 'Salir de pantalla completa'
    },
    securityError: {
      en: 'Security Error',
      zh: '安全错误',
      es: 'Error de seguridad'
    },
    securityErrorDesc: {
      en: 'Embedding this game URL is not allowed. Please contact the site administrator.',
      zh: '不允许嵌入此游戏URL。请联系网站管理员。',
      es: 'No está permitido incrustar la URL de este juego. Póngase en contacto con el administrador del sitio.'
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
  
  // 处理iframe加载完成
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
  
  // 处理iframe加载错误
  const handleIframeError = () => {
    setIsLoading(false);
    setError(t('loadError'));
  };
  
  // 处理全屏模式
  const toggleFullscreen = () => {
    if (!fullscreenEnabled || !iframeRef.current) return;
    
    if (!document.fullscreenElement) {
      // 进入全屏模式
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen()
          .then(() => setIsFullscreen(true))
          .catch(err => {
            console.error(`Fullscreen error: ${err.message}`);
            setError(t('fullscreenError'));
          });
      }
    } else {
      // 退出全屏模式
      if (document.exitFullscreen) {
        document.exitFullscreen()
          .then(() => setIsFullscreen(false))
          .catch(err => {
            console.error(`Exit fullscreen error: ${err.message}`);
          });
      }
    }
  };
  
  // 监听全屏状态变化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // 安全检查：确保只嵌入安全的URL
  const isSafeUrl = () => {
    try {
      const url = new URL(gameUrl);
      // 这里可以添加允许的域名列表
      const allowedDomains = [
        'itch.io',
        'simmer.io',
        'unity.com',
        'unityroom.com',
        'gamejolt.com',
        'newgrounds.com',
        'kongregate.com',
        'crazygames.com',
        'y8.com',
        'github.io',
        'vercel.app',
        'netlify.app',
        'pages.dev',
        'example.com' // 添加示例域名，用于测试
      ];
      
      return allowedDomains.some(domain => url.hostname.includes(domain));
    } catch (e) {
      console.error('Invalid URL:', e);
      return false;
    }
  };
  
  // 如果URL不安全，显示错误
  if (gameUrl && !isSafeUrl()) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        <p className="font-medium">{t('securityError')}</p>
        <p className="text-sm">{t('securityErrorDesc')}</p>
      </div>
    );
  }

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
        
        {/* 游戏iframe */}
        <iframe
          ref={iframeRef}
          src={gameUrl}
          title={title}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        ></iframe>
      </div>
      
      {/* 控制栏 */}
      <div className="mt-2 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          {title}
        </div>
        {fullscreenEnabled && (
          <button
            onClick={toggleFullscreen}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center"
            aria-label={isFullscreen ? t('exitFullscreen') : t('fullscreen')}
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
              </svg>
            )}
            {isFullscreen ? t('exitFullscreen') : t('fullscreen')}
          </button>
        )}
      </div>
    </div>
  );
}; 