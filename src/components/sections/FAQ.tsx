"use client";

import { useState } from 'react';

// FAQ数据
const faqItems = [
  {
    id: 1,
    question: '所有游戏都是免费的吗？',
    answer: '是的，我们网站上的所有游戏都是完全免费的，无需付费。',
  },
  {
    id: 2,
    question: '我需要下载或安装什么吗？',
    answer: '不需要，所有游戏都可以直接在浏览器中玩，无需下载或安装。',
  },
  {
    id: 3,
    question: '游戏支持手机或平板吗？',
    answer: '是的，我们的大多数游戏都支持手机和平板等移动设备。',
  },
  {
    id: 4,
    question: '如何报告游戏问题？',
    answer: '如果您遇到任何问题，请通过页面底部的联系方式告诉我们。',
  },
  {
    id: 5,
    question: '游戏是否有年龄限制？',
    answer: '我们的游戏适合各个年龄段的玩家，每个游戏都有适龄提示，帮助您选择合适的游戏。',
  },
  {
    id: 6,
    question: '我可以在没有互联网连接的情况下玩游戏吗？',
    answer: '不可以，我们的游戏需要互联网连接才能玩。',
  },
];

// FAQ项组件
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium">{question}</span>
        <svg
          className={`w-6 h-6 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </button>
      <div
        className={`mt-2 text-gray-600 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="pb-2">{answer}</p>
      </div>
    </div>
  );
};

export const FAQ = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">常见问题</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            以下是一些玩家经常问的问题。如果您有其他问题，请随时联系我们。
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item) => (
            <FAQItem key={item.id} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}; 