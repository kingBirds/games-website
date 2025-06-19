import { fetchGameById } from '@/lib/gamemonetize';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import GameDetailClient from './game-detail-client';

// 添加元数据生成函数
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
    // 获取游戏数据
    const game = await fetchGameById(slug);
    
    if (!game) {
      return {
        title: 'Game Not Found',
        description: 'The requested game could not be found.',
      };
    }
    
    // 多语言标题
    const titles = {
      zh: `${game.title} - 免费在线游戏 | FreeCasualGame.com`,
      en: `${game.title} - Free Online Game | FreeCasualGame.com`,
      es: `${game.title} - Juego Gratuito en Línea | FreeCasualGame.com`
    };
    
    // 多语言描述
    const descriptions = {
      zh: `免费畅玩${game.title}。${game.description?.substring(0, 150) || '精彩的在线游戏体验'}。无需下载，即点即玩！`,
      en: `Play ${game.title} for free. ${game.description?.substring(0, 150) || 'Amazing online gaming experience'}. No download required, play instantly!`,
      es: `Juega ${game.title} gratis. ${game.description?.substring(0, 150) || 'Experiencia de juego en línea increíble'}. ¡No se requiere descarga, juega al instante!`
    };
    
    const title = titles[locale as keyof typeof titles] || titles.en;
    const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
    
    // 生成关键词
    const gameKeywords = game.tags?.join(', ') || '';
    const categoryKeywords = game.category?.join(', ') || '';
    const keywords = `${game.title}, ${categoryKeywords}, ${gameKeywords}, free games, online games, browser games`;
    
    return {
      title,
      description,
      keywords,
      authors: [{ name: "FreeCasualGame.com" }],
      openGraph: {
        title,
        description,
        url: `https://freecasualgame.com/${locale}/games/${slug}`,
        siteName: 'FreeCasualGame.com',
        type: 'website',
        locale: locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : 'en_US',
        images: [
          {
            url: game.thumbnail,
            width: 512,
            height: 384,
            alt: game.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [game.thumbnail],
      },
      alternates: {
        canonical: `https://freecasualgame.com/${locale}/games/${slug}`,
        languages: {
          'en': `https://freecasualgame.com/en/games/${slug}`,
          'zh': `https://freecasualgame.com/zh/games/${slug}`,
          'es': `https://freecasualgame.com/es/games/${slug}`,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Game Page',
      description: 'Free online game',
    };
  }
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  
  // 验证请求的语言是否受支持
  if (!locales.includes(locale)) notFound();

  try {
    // 在服务器端获取游戏数据
    const game = await fetchGameById(slug);
    
    if (!game) {
      notFound();
      return null;
    }

    // 将数据传递给客户端组件
    return <GameDetailClient game={game} locale={locale} slug={slug} />;
  } catch (error) {
    console.error('获取游戏详情失败:', error);
    notFound();
    return null;
  }
} 