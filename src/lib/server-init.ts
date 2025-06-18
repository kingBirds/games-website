// 服务器启动时的初始化逻辑
// 这个模块会在Next.js服务器启动时运行

import { initializeScheduler } from './scheduler-lite';

// 标记初始化是否已完成
let isInitialized = false;

// 初始化服务器
export async function initializeServer(): Promise<void> {
  if (isInitialized) {
    console.log('🔄 Server already initialized, skipping...');
    return;
  }

  try {
    console.log('🚀 Initializing server...');
    
    // 初始化游戏数据调度器
    await initializeScheduler();
    
    isInitialized = true;
    console.log('✅ Server initialization completed');
  } catch (error) {
    console.error('❌ Server initialization failed:', error);
    // 不要阻止应用启动，只是记录错误
  }
}

// 在模块加载时自动运行初始化
// 这确保在第一次导入这个模块时就会执行初始化
if (typeof window === 'undefined') {
  // 只在服务器端运行
  initializeServer().catch(console.error);
}

export { isInitialized }; 