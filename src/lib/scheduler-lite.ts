// 简化版调度器，避免客户端打包问题
import { isCacheValid } from './data-cache';

// 任务状态接口
export interface TaskStatus {
  isRunning: boolean;
  lastRun: string | null;
  nextRun: string | null;
  lastSuccess: string | null;
  lastError: string | null;
}

// 调度器配置接口
export interface SchedulerConfig {
  updateTime: string;
  enabled: boolean;
  timezone: string;
}

// 默认配置
const DEFAULT_CONFIG: SchedulerConfig = {
  updateTime: '0 3 * * *', // 每天3:00 AM
  enabled: true,
  timezone: 'Asia/Shanghai'
};

// 检查是否在服务器端
function isServer(): boolean {
  return typeof window === 'undefined';
}

// 轻量级调度器类
class GameDataSchedulerLite {
  private config: SchedulerConfig;
  private status: TaskStatus;
  private isInitialized = false;

  constructor(config: SchedulerConfig = DEFAULT_CONFIG) {
    this.config = config;
    this.status = {
      isRunning: false,
      lastRun: null,
      nextRun: null,
      lastSuccess: null,
      lastError: null
    };
  }

  // 获取任务状态
  getStatus(): TaskStatus & { config: SchedulerConfig } {
    return {
      ...this.status,
      config: this.config
    };
  }

  // 手动触发更新
  async triggerUpdate(): Promise<boolean> {
    if (!isServer()) {
      console.log('⚠️  Update can only run on server side');
      return false;
    }

    if (this.status.isRunning) {
      console.log('⚠️  Update task is already running, skipping...');
      return false;
    }

    this.status.isRunning = true;
    this.status.lastRun = new Date().toISOString();

    console.log('🚀 Starting manual game data update...');

    try {
      // 检查缓存是否需要更新
      const cacheValid = await isCacheValid();
      if (cacheValid) {
        console.log('ℹ️  Cache is still valid, but forcing update anyway');
      }

      // 动态导入执行模块
      const { execSync } = await import('child_process');
      const path = await import('path');
      
      const scriptPath = path.join(process.cwd(), 'scripts', 'update-games-data.js');
      
      // 使用同步执行避免复杂性
      const result = execSync(`node "${scriptPath}"`, { 
        encoding: 'utf-8',
        cwd: process.cwd()
      });

      console.log('✅ Manual update completed successfully');
      console.log(result);

      this.status.lastSuccess = new Date().toISOString();
      this.status.lastError = null;
      
      return true;

    } catch (error) {
      console.error('❌ Manual update failed:', error);
      this.status.lastError = error instanceof Error ? error.message : String(error);
      return false;
    } finally {
      this.status.isRunning = false;
    }
  }

  // 检查是否需要立即更新（启动时检查）
  async checkAndUpdateIfNeeded(): Promise<void> {
    if (!isServer()) {
      console.log('⚠️  Cache check can only run on server side');
      return;
    }

    try {
      const cacheValid = await isCacheValid();
      if (!cacheValid) {
        console.log('🔄 Cache is invalid, triggering immediate update...');
        await this.triggerUpdate();
      } else {
        console.log('✅ Cache is valid, no immediate update needed');
      }
    } catch (error) {
      console.error('❌ Error checking cache validity:', error);
    }
  }

  // 模拟启动（实际的定时任务需要在系统层面配置）
  async start(): Promise<void> {
    if (!isServer()) {
      console.log('⚠️  Scheduler can only run on server side');
      return;
    }

    if (this.isInitialized) {
      console.log('⚠️  Scheduler is already initialized');
      return;
    }

    console.log(`🕒 Initializing game data scheduler...`);
    console.log(`📅 Configured schedule: ${this.config.updateTime} (${this.config.timezone})`);
    console.log(`💡 Note: Actual scheduling should be configured at system level (cron/systemd)`);

    this.isInitialized = true;
    
    // 设置下次运行时间（仅供显示）
    this.updateNextRunTime();
    
    console.log('✅ Game data scheduler initialized');
  }

  // 停止（仅标记）
  stop(): void {
    this.isInitialized = false;
    console.log('🛑 Game data scheduler stopped');
  }

  // 更新下次运行时间
  private updateNextRunTime(): void {
    // 简化处理：设置为明天同一时间
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(3, 0, 0, 0); // 设置为明天3点
    
    this.status.nextRun = tomorrow.toISOString();
  }

  // 更新配置
  async updateConfig(newConfig: Partial<SchedulerConfig>): Promise<void> {
    this.config = { ...this.config, ...newConfig };
    console.log('⚙️  Scheduler config updated:', this.config);
  }
}

// 创建单例实例
export const gameDataScheduler = new GameDataSchedulerLite();

// 初始化函数（在应用启动时调用）
export async function initializeScheduler(): Promise<void> {
  if (!isServer()) {
    console.log('⚠️  Scheduler initialization skipped on client side');
    return;
  }

  console.log('🔧 Initializing game data scheduler...');
  
  try {
    // 检查是否需要立即更新
    await gameDataScheduler.checkAndUpdateIfNeeded();
    
    // 启动调度器
    await gameDataScheduler.start();
  } catch (error) {
    console.error('❌ Failed to initialize scheduler:', error);
  }
}

// 优雅关闭
export function shutdownScheduler(): void {
  gameDataScheduler.stop();
}

// 导出类
export { GameDataSchedulerLite }; 