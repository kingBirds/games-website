import Image from 'next/image';

// 步骤数据
const steps = [
  {
    id: 1,
    title: '选择游戏',
    description: '浏览我们的游戏库，找到你喜欢的游戏',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: '点击开始',
    description: '点击游戏卡片，进入游戏详情页',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
      </svg>
    ),
  },
  {
    id: 3,
    title: '开始游戏',
    description: '点击"开始游戏"按钮，立即享受游戏乐趣',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">如何开始</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            只需几个简单的步骤，即可开始享受游戏乐趣。无需注册，无需下载，立即开始游戏。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* 步骤卡片 */}
              <div className="bg-white p-8 rounded-lg shadow-md text-center border-t-4 border-blue-500 h-full">
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-100 rounded-full p-3">{step.icon}</div>
                </div>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {/* 连接线 - 只在非最后一个步骤且非移动端显示 */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 20H40M40 20L25 5M40 20L25 35" stroke="#CBD5E0" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 