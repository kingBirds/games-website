import { GameSection } from '@/components/games/GameSection';
import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { 
  fetchAllPopularityGames, 
  POPULARITY_LABELS,
  PopularityType 
} from '@/lib/gamemonetize';
import { Metadata } from 'next';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 获取 locale
  const { locale } = await params;
  
  // 验证请求的语言是否受支持
  if (!locales.includes(locale)) notFound();

  // 获取所有分类的游戏数据 (每个分类3个游戏)
  const allGames = await fetchAllPopularityGames(3);

  return (
    <SidebarLayout locale={locale}>
      <div>
        {/* 动态显示所有分类的游戏 */}
        {Object.entries(allGames).map(([popularityKey, games], index) => {
          const popularity = popularityKey as PopularityType;
          const title = POPULARITY_LABELS[popularity][locale as keyof typeof POPULARITY_LABELS[PopularityType]];
          const moreLink = `/${locale}/popularity/${popularity}`;
          
          // 交替背景色
          const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
          
          return (
            <GameSection
              key={popularity}
              title={title}
              games={games}
              locale={locale}
              moreLink={moreLink}
              className={bgClass}
            />
          );
        })}
      </div>
    </SidebarLayout>
  );
}

// 生成页面元数据
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const titles = {
    zh: "免费休闲游戏 - FreeCasualGame.com 在线游戏",
    en: "Free Casual Games - Play Online Games at FreeCasualGame.com",
    es: "Juegos Casuales Gratis - Jugar Juegos en Línea en FreeCasualGame.com"
  };
  
  const descriptions = {
    zh: "发现并畅玩最好的免费休闲游戏。无需下载，即点即玩。包含动作、益智、冒险游戏等更多类型。",
    en: "Discover and play the best free casual games online. No downloads required, instant play. Find action, puzzle, adventure games and more.",
    es: "Descubre y juega los mejores juegos casuales gratuitos en línea. No se requieren descargas, juego instantáneo. Encuentra juegos de acción, rompecabezas, aventura y más."
  };
  
  const title = titles[locale as keyof typeof titles] || titles.en;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.en;
  
  return {
    title,
    description,
    keywords: locale === 'zh' 
      ? "免费游戏, 休闲游戏, 在线游戏, 浏览器游戏, 即时游戏, 无需下载游戏"
      : locale === 'es'
      ? "juegos gratis, juegos casuales, juegos en línea, juegos de navegador, juegos instantáneos, juegos sin descarga"
      : "free games, casual games, online games, browser games, instant games, no download games",
    openGraph: {
      title,
      description,
      url: `https://freecasualgame.com/${locale}`,
      siteName: 'FreeCasualGame.com',
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : locale === 'es' ? 'es_ES' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `https://freecasualgame.com/${locale}`,
      languages: {
        'en': 'https://freecasualgame.com/en',
        'zh': 'https://freecasualgame.com/zh',
        'es': 'https://freecasualgame.com/es',
      },
    },
  };
} 