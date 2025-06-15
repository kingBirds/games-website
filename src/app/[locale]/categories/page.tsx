import { locales } from '@/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// 示例分类数据
const categories = [
  {
    id: 'action',
    name: { en: 'Action', zh: '动作' },
    slug: 'action',
    description: { 
      en: 'Fast-paced games that test your reflexes and coordination',
      zh: '快节奏游戏，测试你的反应能力和协调性'
    },
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'adventure',
    name: { en: 'Adventure', zh: '冒险' },
    slug: 'adventure',
    description: { 
      en: 'Explore new worlds and embark on exciting journeys',
      zh: '探索新世界，踏上激动人心的旅程'
    },
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1536751048178-14e15b3fac95?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'puzzle',
    name: { en: 'Puzzle', zh: '益智' },
    slug: 'puzzle',
    description: { 
      en: 'Challenge your brain with logic puzzles and brain teasers',
      zh: '用逻辑谜题和脑筋急转弯挑战你的大脑'
    },
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'strategy',
    name: { en: 'Strategy', zh: '策略' },
    slug: 'strategy',
    description: { 
      en: 'Plan your moves and outsmart your opponents',
      zh: '规划你的行动，智胜对手'
    },
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1611891487122-207579d67d98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'sports',
    name: { en: 'Sports', zh: '体育' },
    slug: 'sports',
    description: { 
      en: 'Compete in virtual sports and athletic challenges',
      zh: '参与虚拟体育和运动挑战'
    },
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 'racing',
    name: { en: 'Racing', zh: '竞速' },
    slug: 'racing',
    description: { 
      en: 'Speed through tracks and compete for the fastest time',
      zh: '在赛道上飞驰，争夺最快时间'
    },
    icon: '/globe.svg',
    featuredImage: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
];

export default async function CategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // 验证请求的语言是否受支持
  if (!locales.includes(locale)) notFound();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {locale === 'zh' ? "游戏分类" : "Game Categories"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link href={`/${locale}/categories/${category.slug}`} key={category.id} className="block group">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
              <div className="relative h-48 w-full">
                {category.featuredImage ? (
                  <Image
                    src={category.featuredImage}
                    alt={locale === 'zh' ? category.name.zh : category.name.en}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <Image
                      src={category.icon}
                      alt={locale === 'zh' ? category.name.zh : category.name.en}
                      width={48}
                      height={48}
                      className="opacity-50"
                    />
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600">
                  {locale === 'zh' ? category.name.zh : category.name.en}
                </h3>
                <p className="text-gray-600">
                  {locale === 'zh' ? category.description.zh : category.description.en}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 