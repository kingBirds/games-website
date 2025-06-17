import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { GAME_CATEGORIES } from '@/lib/game-categories';
import { POPULARITY_OPTIONS } from '@/lib/gamemonetize';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://freecasualgame.com';
  const currentDate = new Date();
  
  const routes: MetadataRoute.Sitemap = [];

  // 主页 - 每种语言
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    });
  });

  // 游戏分类页面
  locales.forEach(locale => {
    // 分类首页
    routes.push({
      url: `${baseUrl}/${locale}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    });

    // 各个分类页面
    GAME_CATEGORIES.forEach(category => {
      routes.push({
        url: `${baseUrl}/${locale}/categories/${category.slug}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  // 热门度页面
  locales.forEach(locale => {
    Object.keys(POPULARITY_OPTIONS).forEach(type => {
      routes.push({
        url: `${baseUrl}/${locale}/popularity/${type}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  // 游戏页面
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}/games`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  // GameMonetize页面
  locales.forEach(locale => {
    routes.push({
      url: `${baseUrl}/${locale}/gamemonetize`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    });
  });

  return routes;
} 