"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getTranslations } from '@/utils/loadTranslations';
import { useParams } from 'next/navigation';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = getTranslations(locale);
  
  // 轮播图数据
  const carouselItems = [
    {
      id: 1,
      title: t.hero.title,
      subtitle: t.hero.subtitle,
      image: '/images/hero-1.jpg', // 这里需要添加实际图片
      buttonText: t.hero.cta,
      buttonLink: `/${locale}/games`,
    },
    {
      id: 2,
      title: locale === 'zh' ? '热门动作游戏' : 
             locale === 'es' ? 'Juegos de Acción Populares' : 
             'Popular Action Games',
      subtitle: locale === 'zh' ? '体验刺激的动作游戏，挑战你的反应能力' : 
                locale === 'es' ? 'Experimenta emocionantes juegos de acción que desafían tus reflejos' : 
                'Experience exciting action games that challenge your reflexes',
      image: '/images/hero-2.jpg', // 这里需要添加实际图片
      buttonText: locale === 'zh' ? '查看动作游戏' : 
                  locale === 'es' ? 'Ver Juegos de Acción' : 
                  'View Action Games',
      buttonLink: `/${locale}/categories/action`,
    },
    {
      id: 3,
      title: locale === 'zh' ? '益智解谜游戏' : 
             locale === 'es' ? 'Juegos de Rompecabezas' : 
             'Puzzle Games',
      subtitle: locale === 'zh' ? '锻炼你的大脑，解决各种有趣的谜题' : 
                locale === 'es' ? 'Ejercita tu cerebro y resuelve rompecabezas interesantes' : 
                'Exercise your brain and solve interesting puzzles',
      image: '/images/hero-3.jpg', // 这里需要添加实际图片
      buttonText: locale === 'zh' ? '查看益智游戏' : 
                  locale === 'es' ? 'Ver Juegos de Rompecabezas' : 
                  'View Puzzle Games',
      buttonLink: `/${locale}/categories/puzzle`,
    },
  ];
  
  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // 手动切换轮播图
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };
  
  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      {/* 轮播图 */}
      <div className="absolute inset-0">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* 图片背景 - 实际项目中需要替换为真实图片 */}
            <div className="absolute inset-0 bg-gray-800">
              {/* 如果有实际图片，可以使用下面的代码 */}
              {/* <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
              /> */}
              
              {/* 临时背景，可以在有实际图片时删除 */}
              <div className={`absolute inset-0 bg-gradient-to-r ${
                index === 0 ? 'from-blue-900 to-purple-900' :
                index === 1 ? 'from-red-900 to-orange-900' :
                'from-green-900 to-teal-900'
              }`}></div>
            </div>
            
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            
            {/* 内容 */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-3xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {item.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-200 mb-8">
                    {item.subtitle}
                  </p>
                  <Link
                    href={item.buttonLink}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105"
                  >
                    {item.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 指示器 */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}; 