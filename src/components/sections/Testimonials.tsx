"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

// 评价数据
const testimonials = [
  {
    id: 1,
    name: '张明',
    role: '游戏爱好者',
    content: '这个网站太棒了！我可以在任何地方玩游戏，不需要下载任何东西。界面也很友好，很容易找到我喜欢的游戏。',
    avatar: '/images/avatars/avatar-1.jpg', // 需要添加实际头像
  },
  {
    id: 2,
    name: '李华',
    role: '学生',
    content: '作为一名学生，我喜欢在休息时间玩这些游戏。它们加载速度快，而且完全免费，这对我来说非常重要。',
    avatar: '/images/avatars/avatar-2.jpg', // 需要添加实际头像
  },
  {
    id: 3,
    name: '王芳',
    role: '上班族',
    content: '我经常在午休时间玩这些游戏放松一下。游戏种类很丰富，从简单的益智游戏到更复杂的策略游戏都有。',
    avatar: '/images/avatars/avatar-3.jpg', // 需要添加实际头像
  },
  {
    id: 4,
    name: '刘伟',
    role: '游戏博主',
    content: '作为一名游戏博主，我非常欣赏这个平台的用户体验。游戏质量很高，而且定期更新新游戏。',
    avatar: '/images/avatars/avatar-4.jpg', // 需要添加实际头像
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="py-16 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">用户评价</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            听听我们的用户怎么说。这些是来自真实玩家的评价。
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* 评价轮播 */}
          <div className="relative bg-white rounded-lg shadow-lg p-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'
                }`}
                style={{ zIndex: index === activeIndex ? 1 : 0 }}
              >
                <div className="flex flex-col items-center">
                  {/* 用户头像 - 如果有实际头像可以使用Image组件 */}
                  <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 overflow-hidden">
                    {/* 如果有实际头像，可以使用下面的代码 */}
                    {/* <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    /> */}
                    
                    {/* 临时头像，可以在有实际头像时删除 */}
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  
                  {/* 评价内容 */}
                  <div className="text-center">
                    <p className="text-gray-600 text-lg italic mb-4">"{testimonial.content}"</p>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {/* 导航按钮 */}
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
              <button
                className="bg-white rounded-full shadow-md p-2 focus:outline-none"
                onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
              <button
                className="bg-white rounded-full shadow-md p-2 focus:outline-none"
                onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* 指示器 */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 