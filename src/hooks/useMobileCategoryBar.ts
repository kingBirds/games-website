"use client";

import { useState, useEffect } from 'react';

// 全局状态管理
let globalCategoryBarState = true;
let globalSetters: Array<(value: boolean) => void> = [];

export const useMobileCategoryBar = () => {
  const [isCategoryBarOpen, setIsCategoryBarOpen] = useState(globalCategoryBarState);

  useEffect(() => {
    // 添加当前组件的setter到全局列表
    globalSetters.push(setIsCategoryBarOpen);
    
    // 清理函数：移除setter
    return () => {
      globalSetters = globalSetters.filter(setter => setter !== setIsCategoryBarOpen);
    };
  }, []);

  const updateCategoryBarState = (value: boolean) => {
    globalCategoryBarState = value;
    // 更新所有使用此hook的组件
    globalSetters.forEach(setter => setter(value));
  };

  const toggleCategoryBar = () => {
    updateCategoryBarState(!globalCategoryBarState);
  };

  const hideCategoryBar = () => {
    updateCategoryBarState(false);
  };

  const showCategoryBar = () => {
    updateCategoryBarState(true);
  };

  return {
    isCategoryBarOpen,
    toggleCategoryBar,
    hideCategoryBar,
    showCategoryBar,
  };
}; 