import { sampleCategories } from '@/lib/sample-data';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoriesPage() {
  // 通常这里会从用户会话或浏览器设置中获取语言
  const locale = 'zh'; // 默认中文

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">游戏分类</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleCategories.map((category) => (
          <Link 
            href={`/games?category=${category.id}`} 
            key={category.id}
            className="group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform group-hover:shadow-lg group-hover:transform group-hover:scale-105">
              {/* 分类图片 */}
              <div className="relative h-40 bg-gradient-to-r from-blue-500 to-purple-600">
                {/* 如果有实际图片，可以使用下面的代码 */}
                {/* <Image
                  src={category.featuredImage || '/images/categories/default.jpg'}
                  alt={category.name[locale]}
                  fill
                  style={{ objectFit: 'cover' }}
                /> */}
                
                {/* 图标 */}
                <div className="absolute inset-0 flex items-center justify-center text-white">
                  <div className="bg-white/20 p-6 rounded-full">
                    {/* 这里可以根据category.icon显示不同的图标 */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* 分类信息 */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{category.name[locale]}</h2>
                <p className="text-gray-600 text-sm line-clamp-2">{category.description[locale]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
} 