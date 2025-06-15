'use client';

import { useState, useEffect } from 'react';

// 缓存已加载的翻译
const translationCache: Record<string, any> = {};

/**
 * 加载内容翻译的自定义Hook
 * @param locale 语言代码
 * @returns 翻译内容、加载状态和错误信息
 */
export function useContentTranslations(locale: string) {
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadTranslations() {
      try {
        setIsLoading(true);
        
        // 检查缓存
        if (translationCache[locale]) {
          setTranslations(translationCache[locale]);
          setIsLoading(false);
          return;
        }
        
        // 加载翻译文件 - 使用绝对路径
        const response = await fetch(`/locales/${locale}/content.json`, {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${locale}: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // 更新缓存
        translationCache[locale] = data;
        
        setTranslations(data);
      } catch (err) {
        console.error('Error loading translations:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    }
    
    loadTranslations();
  }, [locale]);

  return { translations, isLoading, error };
}

/**
 * 预加载指定语言的内容翻译
 * @param locale 语言代码
 * @returns Promise
 */
export async function preloadContentTranslations(locale: string): Promise<void> {
  // 如果已经缓存，直接返回
  if (translationCache[locale]) {
    return;
  }
  
  try {
    const response = await fetch(`/locales/${locale}/content.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to preload translations for ${locale}: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // 更新缓存
    translationCache[locale] = data;
  } catch (err) {
    console.error('Error preloading translations:', err);
    throw err;
  }
}

/**
 * 同步获取内容翻译（如果已缓存）
 * @param locale 语言代码
 * @returns 翻译内容或null
 */
export function getCachedContentTranslations(locale: string): any | null {
  return translationCache[locale] || null;
} 