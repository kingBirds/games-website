import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { 
  fetchGamesByPopularity, 
  POPULARITY_OPTIONS, 
  POPULARITY_LABELS,
  PopularityType 
} from '@/lib/gamemonetize';
import { GameSection } from '@/components/games/GameSection';
import { SidebarLayout } from '@/components/layout/SidebarLayout';

interface PopularityPageProps {
  params: Promise<{
    locale: string;
    type: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function PopularityPage({
  params,
  searchParams
}: PopularityPageProps) {
  const { locale, type } = await params;
  const { page = '1' } = await searchParams;
  
  // 验证语言和类型
  if (!locales.includes(locale)) notFound();
  if (!Object.keys(POPULARITY_OPTIONS).includes(type)) notFound();
  
  const popularityType = type as PopularityType;
  const currentPage = parseInt(page);
  const gamesPerPage = 20;
  
  // 获取游戏数据
  const games = await fetchGamesByPopularity(popularityType, gamesPerPage * currentPage);
  
  // 分页处理
  const startIndex = (currentPage - 1) * gamesPerPage;
  const endIndex = startIndex + gamesPerPage;
  const currentGames = games.slice(startIndex, endIndex);
  const hasMore = games.length > endIndex;
  
  // 获取标题
  const title = POPULARITY_LABELS[popularityType][locale as keyof typeof POPULARITY_LABELS[PopularityType]];
  
  return (
    <SidebarLayout locale={locale}>
      <div className="container mx-auto px-4 py-4">
        {/* 页面标题 */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-gray-600">
              {locale === 'zh' 
                ? `发现最好的${title?.replace('游戏', '') || ''}游戏` 
                : locale === 'es'
                ? `Descubre los mejores ${title?.toLowerCase() || 'juegos'}`
                : `Discover the best ${title?.toLowerCase() || 'games'}`
              }
            </p>
          </div>
        </div>
        
        {/* 游戏列表 */}
        <GameSection
          title=""
          games={currentGames}
          locale={locale}
          className="py-0"
        />
        
        {/* 分页控制 */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          {currentPage > 1 && (
            <a
              href={`/${locale}/popularity/${type}?page=${currentPage - 1}`}
              className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {locale === 'zh' ? '上一页' : locale === 'es' ? 'Anterior' : 'Previous'}
            </a>
          )}
          
          <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            {locale === 'zh' ? `第 ${currentPage} 页` : locale === 'es' ? `Página ${currentPage}` : `Page ${currentPage}`}
          </span>
          
          {hasMore && (
            <a
              href={`/${locale}/popularity/${type}?page=${currentPage + 1}`}
              className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {locale === 'zh' ? '下一页' : locale === 'es' ? 'Siguiente' : 'Next'}
            </a>
          )}
        </div>
        
        {/* 返回首页链接 */}
        <div className="text-center mt-8">
          <a
            href={`/${locale}`}
            className="text-blue-600 hover:text-blue-700 transition-colors"
          >
            {locale === 'zh' ? '← 返回首页' : locale === 'es' ? '← Volver al Inicio' : '← Back to Home'}
          </a>
        </div>
      </div>
    </SidebarLayout>
  );
}

// 生成静态参数
export async function generateStaticParams() {
  const params = [];
  
  for (const locale of locales) {
    for (const type of Object.keys(POPULARITY_OPTIONS)) {
      params.push({
        locale,
        type
      });
    }
  }
  
  return params;
}

// 页面元数据
export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const { locale, type } = await params;
  
  if (!Object.keys(POPULARITY_OPTIONS).includes(type)) {
    return {
      title: 'Page Not Found'
    };
  }
  
  const popularityType = type as PopularityType;
  const title = POPULARITY_LABELS[popularityType][locale as keyof typeof POPULARITY_LABELS[PopularityType]];
  
  return {
    title: `${title} - ${locale === 'zh' ? '游戏网站' : locale === 'es' ? 'Sitio de Juegos' : 'Game Website'}`,
    description: locale === 'zh' 
      ? `发现最好的${title}，免费在线游戏` 
      : locale === 'es'
      ? `Descubre los mejores ${title?.toLowerCase() || 'juegos'}, juegos gratuitos en línea`
      : `Discover the best ${title?.toLowerCase() || 'games'}, free online games`
  };
} 