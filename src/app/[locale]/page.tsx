import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { GameGrid } from '@/components/games/GameGrid';
import { sampleGames } from '@/lib/sample-data';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 获取 locale
  const { locale } = await params;
  
  // 验证请求的语言是否受支持
  if (!locales.includes(locale)) notFound();

  // 获取示例游戏数据
  const featuredGames = sampleGames.filter((game: any) => game.isFeatured).slice(0, 6);
  const newGames = sampleGames.filter((game: any) => game.isNew).slice(0, 8);
  const popularGames = sampleGames.sort((a: any, b: any) => b.playCount - a.playCount).slice(0, 8);

  return (
    <main>
      <Hero />
      
      {/* 精选游戏 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'zh' ? "精选游戏" : "Featured Games"}
          </h2>
          <GameGrid games={featuredGames} locale={locale} />
        </div>
      </section>
      
      <Features />
      
      {/* 最新游戏 */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'zh' ? "最新游戏" : "New Games"}
          </h2>
          <GameGrid games={newGames} locale={locale} />
        </div>
      </section>
      
      <HowItWorks />
      
      {/* 热门游戏 */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">
            {locale === 'zh' ? "热门游戏" : "Popular Games"}
          </h2>
          <GameGrid games={popularGames} locale={locale} />
        </div>
      </section>
      
      <Testimonials />
      <FAQ />
    </main>
  );
} 