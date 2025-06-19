import { SidebarLayout } from '@/components/layout/SidebarLayout';
import { GameSection } from '@/components/games/GameSection';
import { readCachedGamesData } from '@/lib/data-cache';
import { locales } from '@/i18n';
import { notFound } from 'next/navigation';

export default async function GamesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 获取 locale
  const { locale } = await params;
  
  // 验证请求的语言是否受支持
  if (!locales.includes(locale)) notFound();

  // 获取所有游戏
  const cachedData = await readCachedGamesData();
  const allGames = cachedData?.allGames || [];

  return (
    <SidebarLayout locale={locale}>
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-bold mb-6">
          {locale === 'zh' ? "所有游戏" : locale === 'es' ? "Todos los Juegos" : "All Games"}
        </h1>
        
        {/* 游戏列表 */}
        <GameSection
          title=""
          games={allGames}
          locale={locale}
          className="py-0"
        />
        
        {/* 如果没有游戏 */}
        {allGames.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">
              {locale === 'zh' ? '暂无游戏' : locale === 'es' ? 'No hay juegos' : 'No games available'}
            </h2>
            <p className="text-gray-600">
              {locale === 'zh' 
                ? '游戏数据正在加载中，请稍后再试。' 
                : locale === 'es' 
                ? 'Los datos del juego se están cargando, inténtalo de nuevo más tarde.' 
                : 'Game data is loading, please try again later.'
              }
            </p>
          </div>
        )}
      </div>
    </SidebarLayout>
  );
} 