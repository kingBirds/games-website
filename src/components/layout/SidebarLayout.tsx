"use client";

import { Sidebar } from './Sidebar';
import { MobileCategoryBar } from './MobileCategoryBar';
import { useState } from 'react';
import { useMobileCategoryBar } from '@/hooks/useMobileCategoryBar';

interface SidebarLayoutProps {
  children: React.ReactNode;
  locale: string;
  className?: string;
}

export const SidebarLayout = ({ children, locale, className = "" }: SidebarLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isCategoryBarOpen, hideCategoryBar } = useMobileCategoryBar();

  const handleCategorySelect = () => {
    hideCategoryBar();
  };

  return (
    <div className={`min-h-screen ${className}`}>
      {/* 桌面端侧边栏 */}
      <Sidebar 
        locale={locale} 
        className="hidden lg:block" 
        onCollapseChange={setIsSidebarCollapsed}
      />
      
      {/* 移动端分类导航条 */}
      {isCategoryBarOpen && (
        <MobileCategoryBar 
          locale={locale} 
          onCategorySelect={handleCategorySelect}
        />
      )}
      
      {/* 主内容区域 */}
      <main className={`bg-gray-100 transition-all duration-300 min-h-screen
        px-4 sm:px-6 py-4 sm:py-6
        ${isSidebarCollapsed ? 'lg:ml-16 lg:pl-6' : 'lg:ml-64 lg:pl-6'}
      `}>
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}; 