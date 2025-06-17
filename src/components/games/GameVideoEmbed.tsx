'use client';

import { useEffect, useRef } from 'react';
import { getGameVideoEmbedCode } from '@/lib/gamemonetize';

interface GameVideoEmbedProps {
  gameId: string;
  title: string;
  locale: string;
}

export const GameVideoEmbed = ({
  gameId,
  title,
  locale,
}: GameVideoEmbedProps) => {
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 获取视频嵌入代码
    const { scriptCode, divId } = getGameVideoEmbedCode(gameId);
    
    // 确保容器存在
    if (!containerRef.current) return;
    
    // 创建视频容器div
    const videoDiv = document.createElement('div');
    videoDiv.id = divId;
    containerRef.current.appendChild(videoDiv);
    
    // 创建脚本元素
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = scriptCode;
    document.body.appendChild(script);
    
    // 保存脚本引用以便清理
    scriptRef.current = script;
    
    // 清理函数
    return () => {
      if (scriptRef.current) {
        document.body.removeChild(scriptRef.current);
      }
      
      // 移除API脚本
      const apiScript = document.getElementById('gamemonetize-video-api');
      if (apiScript) {
        apiScript.remove();
      }
      
      // 移除视频容器
      if (containerRef.current && videoDiv) {
        try {
          containerRef.current.removeChild(videoDiv);
        } catch (e) {
          console.error('Error removing video div:', e);
        }
      }
    };
  }, [gameId]);

  // 多语言文本
  const translations = {
    videoGuide: {
      en: 'Game Walkthrough',
      zh: '游戏攻略',
      es: 'Guía del juego'
    }
  };
  
  // 获取翻译文本
  const t = (key: keyof typeof translations) => {
    return translations[key][locale as keyof typeof translations[typeof key]] || translations[key]['en'];
  };

  return (
    <div className="game-video-container w-full">
      <h3 className="text-2xl font-bold mb-4">{t('videoGuide')}</h3>
      <div 
        ref={containerRef}
        className="relative w-full bg-gray-900 rounded-lg overflow-hidden"
        aria-label={`${title} ${t('videoGuide')}`}
      >
        {/* GameMonetize视频将在这里加载 */}
      </div>
    </div>
  );
}; 