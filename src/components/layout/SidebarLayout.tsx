"use client";

import { Sidebar } from './Sidebar';
import { useState } from 'react';

interface SidebarLayoutProps {
  children: React.ReactNode;
  locale: string;
  className?: string;
}

export const SidebarLayout = ({ children, locale, className = "" }: SidebarLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className={`min-h-screen ${className}`}>
      {/* 侧边栏 */}
      <Sidebar 
        locale={locale} 
        className="hidden lg:block" 
        onCollapseChange={setIsSidebarCollapsed}
      />
      
      {/* 主内容区域 */}
      <main className={`bg-gray-100 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16 lg:pl-6' : 'lg:ml-64 lg:pl-6'
      }`}>
        {children}
      </main>
      
      {/* 移动端侧边栏 - 可以后续添加抽屉式实现 */}
    </div>
  );
}; 